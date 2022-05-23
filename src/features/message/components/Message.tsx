import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { MessageItem } from './MessageItem';
import { SelectedMessage } from './SelectedMessage';
import '../../../assets/css/elements/radio.css';

export const Message = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message"
                    subtitle='投稿'
                />
                <SelectedMessage
                    name='ダレハナ'
                    post_date='2022年10月07日 21:45'
                />
                <div>
                    <MessageItem
                        item_name='コーナー/件名'
                        value='死んでもやめんじゃねーぞ'
                    />
                    <MessageItem
                        item_name='ラジオネーム'
                        value='ハイキングベアー'
                    />
                    <MessageItem
                        item_name='本名・住所を記載したかどうか'
                        value='いいえ'
                    />
                    <MessageItem
                        item_name='電話番号を記載したかどうか'
                        value='はい'
                    />
                    <MessageItem
                        item_name='本文'
                        value='こんにちは。いつも楽しく拝聴しています！

                        これからも頑張ってください！'
                    />
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
