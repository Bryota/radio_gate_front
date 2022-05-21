import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { SelectedMessageTemplate } from './SelectedMessageTemplate';
import '../../../assets/css/radio.css';

export const MessageTemplate = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Template"
                    subtitle='メッセージテンプレート'
                />
                <SelectedMessageTemplate
                    name='お昼の番組ふつおた'
                />
                <div>
                    <p className='h3 mb-4'>本文</p>
                    <InnerBox>
                        こんにちは。いつも楽しく拝聴しています！
                        これからも頑張ってください！
                    </InnerBox>
                </div>
                <Button
                    text='編集する'
                    type='post'
                    click_action={click_handler}
                />
                <Button
                    text='削除する'
                    type='delete'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
