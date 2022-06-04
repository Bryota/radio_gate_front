import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';

export const ForgotPasswordComplete = () => {
    const location = useLocation()
    const [email, setEmail] = useState<{ email: string }>(location.state as { email: string })
    const navigation = useNavigate();

    const click_handler = () => {
        return (
            navigation('/login')
        );
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Forgot Password"
                    subtitle='パスワード再設定用メール送信'
                />
                <div className='text-center mt-5 mb-4'>
                    {/* TDOD: リファクタ */}
                    <p className='h4'>{`パスワード再発行リンクを${email.email}に送信しました。`}</p>
                    <p className='h4'>指定のリンクからパスワードを再発行してください。</p>
                </div>
                <Button
                    text='ログイン画面へ'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
