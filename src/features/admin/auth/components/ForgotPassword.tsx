import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../settings/Axios';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminInput } from '../../../../components/Form';
import { AdminButton } from '../../../../components/Elements';
import { validationCheck } from '../../../../modules/validation/validationCheck';
import { usePostApi } from '../../../../hooks/usePostApi';

import { validatedArrayType } from '../../../../types/common';
export const AdminForgotPassword = () => {
    const [email, setEmail] = useState<string>();
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const { response, postApi: SendEmail } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/forgot-password`, { email });

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
                    // TODO: 送信後対応
                    if (response.status === 200) {
                        alert('メールを送信しました');
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
            <AdminMainLayout>
                <AdminPagehead
                    title="パスワード再設定用メール送信"
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
                <AdminButton
                    text='送信'
                    type='get'
                    click_action={sendEmailForPasswordReset}
                />
            </AdminMainLayout>
        </>
    )
}
