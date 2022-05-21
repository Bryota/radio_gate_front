import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import '../../../assets/css/radio.css';

export const CreateMessageTemplate = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Template Create"
                    subtitle='メッセージテンプレート作成'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='テンプレート名'
                        is_first_item={true}
                    />
                    <Textarea
                        key='body'
                        text='本文'
                    />
                </InnerBox>
                <Button
                    text='作成する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
