import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminInput } from '../../../../components/Form';
import { AdminButton } from '../../../../components/Elements';

export const AdminPasswordUpdate = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="パスワード更新"
                />
                <AdminInput
                    key='email'
                    text='e-mail'
                />
                <AdminInput
                    key='password'
                    text='password'
                />
                <AdminInput
                    key='password_confirm'
                    text='password_confirm'
                />
                <AdminButton
                    text='更新'
                    type='get'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
