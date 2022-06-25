import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../settings/Axios';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';
import { validationCheck } from '../../../modules/validation/validationCheck';

type validatedArrayType = {
    key: string,
    message: string
}

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

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
                },
                {
                    key: 'password',
                    value: password,
                    type: 'require'
                },
            ]
        )
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const click_handler = async () => {
        if (validation()) {
            return;
        }
        await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/sanctum/csrf-cookie`)
            .then(async () => {
                await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/login`, {
                    email,
                    password
                }).then(res => {
                    // TODO: エラー時の処理追加
                    if (res.status === 200) {
                        return (
                            navigation('/message_post')
                        )
                    } else {
                        console.log(res.data.message);
                    }
                })
            })
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Login"
                    subtitle='ログイン'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                        type="email"
                        is_first_item={true}
                        change_action={e => setEmail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                    />
                    <Input
                        key='password'
                        text='パスワード'
                        type="password"
                        change_action={e => setPassword(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'password')}
                    />
                </InnerBox>
                <Button
                    text='ログインする'
                    type='post'
                    click_action={click_handler}
                />
                <div className='text-center mb-3'>
                    <a href="/register">新規登録の方はこちら</a>
                </div>
                <div className='text-center pb-5'>
                    <a href="/forgot_password">パスワードを忘れた方はこちら</a>
                </div>
            </MainLayout>
        </>
    )
}
