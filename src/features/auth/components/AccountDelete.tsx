import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';

export const AccountDelete = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Account Delete"
                    subtitle='アカウント削除'
                />
                <div className='text-center mt-5 mb-4'>
                    <p className='h4'>アカウントを削除すると投稿履歴含め全ての情報が削除されます。</p>
                    <p className='h4'>お気をつけください。</p>
                </div>
                <Button
                    text='アカウント削除'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
