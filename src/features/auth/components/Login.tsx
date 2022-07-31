import axios from '../../../settings/Axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { usePostApi } from '../../../hooks/usePostApi';

import { validatedArrayType } from '../../../types/common';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
    const { response, postApi: SendCredentials } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/login`, { email, password });
    const navigation = useNavigate();

    useEffect(() => {
        if (response.status === 200) {
            return navigation('/message_post');
        } else {
            setInvalidCredentials(true);
        }
    }, [response])

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

    const Login = async () => {
        setInvalidCredentials(false);
        setValidationMessages([]);
        if (validation()) {
            return;
        }
        axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/sanctum/csrf-cookie`).then(() => {
            SendCredentials();
        });
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Login"
                    subtitle='ログイン'
                />
                <InnerBox>
                    {invalidCredentials ? <p className='mb-4 color-accent'>メールアドレスかパスワードが異なっています。</p> : <></>}
                    <Input
                        key='email'
                        text='メールアドレス'
                        type="email"
                        is_first_item={true}
                        changeAction={e => setEmail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                        data_testid='login-input-email'
                    />
                    <Input
                        key='password'
                        text='パスワード'
                        type="password"
                        changeAction={e => setPassword(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'password')}
                        data_testid='login-input-password'
                    />
                </InnerBox>
                <Button
                    text='ログインする'
                    type='post'
                    clickAction={Login}
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
