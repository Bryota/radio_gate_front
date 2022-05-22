import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import '../../../assets/css/elements/radio.css';

export const EditMessageTemplate = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Template Edit"
                    subtitle='メッセージテンプレート更新'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='テンプレート名'
                        value='お昼の番組ふつおた'
                        is_first_item={true}
                    />
                    <Textarea
                        key='body'
                        text='本文'
                        value='こんにちは。いつも楽しく拝聴しています！

                        これからも頑張ってください！'
                    />
                </InnerBox>
                <Button
                    text='更新する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
