import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import '../../../assets/css/elements/radio.css';

export const RequestFunction = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Function"
                    subtitle='機能リクエスト'
                />
                <SelectedRequestFunction
                    name='住所を複数設定できる'
                />
                <div>
                    <p className='h3 mb-4'>詳細</p>
                    <InnerBox>
                        メッセージを投稿する際に、アカウントに設定された住所以外の住所も設定できるようにしたい。
                        また、アカウントの住所設定の段階で複数の住所を設定できるようにしたい。
                    </InnerBox>
                </div>
                <Button
                    text='投票する'
                    type='post'
                    click_action={click_handler}
                />
                <Button
                    text='機能リクエスト一覧'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
