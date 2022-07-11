import axios from '../../../../settings/Axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminInput } from '../../../../components/Form';
import { AdminButton } from '../../../../components/Elements';
import { validationCheck } from '../../../../modules/validation/validationCheck';
import { usePostApi } from '../../../../hooks/usePostApi';

import { validatedArrayType } from '../../../../types/common';

export const AdminLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const { response, postApi: SendCredentials } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/login`, { email, password });
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

    const Login = async () => {
        if (validation()) {
            return;
        }
        axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/sanctum/csrf-cookie`).then(() => {
            SendCredentials();
        });
        // TODO: エラー時の処理追加
        if (response.status === 200) {
            return (
                navigation('/admin/radio_stations')
            )
        } else {
            console.log('ログインできませんでした。');
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="管理者ログイン"
                />
                <AdminInput
                    key='email'
                    text='e-mail'
                    changeAction={e => setEmail(e.target.value)}
                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                />
                <AdminInput
                    key='password'
                    text='password'
                    changeAction={e => setPassword(e.target.value)}
                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'password')}
                />
                <AdminButton
                    text='ログイン'
                    type='get'
                    click_action={Login}
                />
                <div className="text-center">
                    <a href="/admin/forgot_password">パスワード再発行</a>
                </div>
            </AdminMainLayout>
        </>
    )
}
