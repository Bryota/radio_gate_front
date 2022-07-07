import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../settings/Axios';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { usePostApi } from '../../../hooks/usePostApi';

import { validatedArrayType } from '../../../types/common';

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>();
    const navigation = useNavigate();
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const { response, postApi: SendEmail } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/forgot-password`, { email });

    const validation = () => {
        const result = validationCheck(
            [
                {
                    key: 'email',
                    value: email,
                    type: 'require'
                },
                {
                    key: 'email',
                    value: email,
                    type: 'email'
                }
            ]
        )
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const sendEmailForPasswordReset = async () => {
        if (validation()) {
            return;
        }
        try {
            await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/sanctum/csrf-cookie`)
                .then(async () => {
                    SendEmail();
                    if (response.status === 200) {
                        return (
                            navigation('/forgot_password/complete', { state: { email: email } })
                        );
                    } else {
                        alert('メールが送れませんでした');
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
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
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
