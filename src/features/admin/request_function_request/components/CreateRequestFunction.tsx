import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminInput, AdminTextarea } from '../../../../components/Form';

export const AdminCreateRequestFunction = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト作成"
                />
                <AdminInput
                    key='name'
                    text='name'
                />
                <AdminTextarea
                    key='detail'
                    text='detail'
                />
                <AdminButton
                    text='作成'
                    type='post'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
