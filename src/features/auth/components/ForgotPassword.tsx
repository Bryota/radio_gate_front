import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../settings/Axios';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>();
    const navigation = useNavigate();

    const sendEmailForPasswordReset = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/forgot_password`, {
                email,
            }).then((res) => {
                if (res.status === 200) {
                    return (
                        navigation('/forgot_password/complete', { state: { email: email } })
                    );
                } else {
                    alert(res.data.message)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Forgot Password"
                    subtitle='パスワード再設定用メール送信'
                />
                <InnerBox>
                    <Input
                        key='email'
                        value={email}
                        text='メールアドレス'
                        type="email"
                        is_first_item={true}
                        changeAction={e => setEmail(e.target.value)}
                    />
                </InnerBox>
                <Button
                    text='送信する'
                    type='post'
                    clickAction={sendEmailForPasswordReset}
                />
            </MainLayout>
        </>
    )
}
