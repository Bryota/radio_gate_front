import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const CreateRequestFunction = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Function Create"
                    subtitle='機能リクエスト申請'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='タイトル'
                    />
                    <Textarea
                        key='detail'
                        text='詳細'
                    />
                </InnerBox>
                <Button
                    text='申請する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
