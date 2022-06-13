import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminInput, AdminTextarea } from '../../../../components/Form';

export const AdminEditRequestFunction = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト編集"
                />
                <AdminInput
                    key='name'
                    text='name'
                    value='複数の住所を設定したい'
                />
                <AdminTextarea
                    key='detail'
                    text='detail'
                    value='メッセージ投稿時に複数の住所から選べるようにしたい'
                />
                <AdminButton
                    text='更新'
                    type='post'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
