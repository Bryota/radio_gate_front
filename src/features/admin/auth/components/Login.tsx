import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminInput } from '../../../../components/Form';
import { AdminButton } from '../../../../components/Elements';

export const AdminLogin = () => {

    const click_handler = () => {
        return '';
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
                />
                <AdminInput
                    key='password'
                    text='password'
                />
                <AdminButton
                    text='ログイン'
                    type='get'
                    click_action={click_handler}
                />
                <div className="text-center">
                    <a href="/admin/forgot_password">パスワード再発行</a>
                </div>
            </AdminMainLayout>
        </>
    )
}
