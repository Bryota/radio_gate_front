import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';

export const MessagePostComplete = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Complete"
                    subtitle='メッセージ投稿完了'
                />
                <div className='text-center mt-5 mb-4'>
                    <p className='h4'>オードリーのオールナイトニッポンへのメッセージが投稿されました。</p>
                    <p className='h4'>採用されることを願っています！</p>
                </div>
                <Button
                    text='投稿一覧'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
