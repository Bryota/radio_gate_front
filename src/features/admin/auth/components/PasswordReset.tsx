import axios from '../../../../settings/Axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminInput } from '../../../../components/Form';
import { AdminButton } from '../../../../components/Elements';
import { validationCheck } from '../../../../modules/validation/validationCheck';

import { validatedArrayType } from '../../../../types/common';

export const AdminPasswordReset = () => {
    const search = useLocation().search;
    const getParams = new URLSearchParams(search);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
    const navigation = useNavigate();
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);

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
                {
                    key: 'password_confirmation',
                    value: password,
                    type: 'confirm',
                    confirm: passwordConfirmation
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

    const resetPassword = async () => {
        if (validation()) {
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/password`, {
                email,
                password,
                password_confirmation: passwordConfirmation,
                token: getParams.get('token')
            }).then((res) => {
                if (res.status === 200) {
                    return (
                        navigation('/admin/login')
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
            <AdminMainLayout>
                <AdminPagehead
                    title="パスワード再設定"
                />
                <AdminInput
                    key='email'
                    value={email}
                    text='メールアドレス'
                    type="email"
                    is_first_item={true}
                    changeAction={e => setEmail(e.target.value)}
                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                />
                <AdminInput
                    key='password'
                    value={password}
                    text='パスワード'
                    type="password"
                    changeAction={e => setPassword(e.target.value)}
                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'password')}
                />
                <AdminInput
                    key='password_confirmation'
                    value={passwordConfirmation}
                    text='パスワード確認'
                    type="password"
                    changeAction={e => setPasswordConfirmation(e.target.value)}
                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'password_confirmation')}
                />
                <AdminButton
                    text='再設定'
                    type='get'
                    click_action={resetPassword}
                />
            </AdminMainLayout>
        </>
    )
}
