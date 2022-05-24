import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';

export const AdminRequestFunction = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト"
                />
                <div>
                    <p className='font-30 underline-green'>複数の住所を設定したい</p>
                    <div className='mt-4'>
                        <p className='font-25 mb-2'>detail</p>
                        <div className='bg-white p-4'>
                            メッセージ投稿時に複数の住所から選べるようにしたい
                        </div>
                    </div>
                </div>
                <AdminButton
                    text='一覧'
                    type='get'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
