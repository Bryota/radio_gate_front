import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';

export const ForgotPasswordComplete = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Forgot Password"
                    subtitle='パスワード再設定用メール送信'
                />
                <div className='text-center mt-5 mb-4'>
                    <p className='h4'>パスワード再発行リンクをtest@example.comに送信しました。</p>
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
