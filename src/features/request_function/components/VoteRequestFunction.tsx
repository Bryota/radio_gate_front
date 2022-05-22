import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input } from '../../../components/Form';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import '../../../assets/css/radio.css';

export const VoteRequestFunction = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Function Vote"
                    subtitle='機能リクエスト申請'
                />
                <SelectedRequestFunction
                    name='住所を複数設定できる'
                />
                <InnerBox>
                    <Input
                        key='point'
                        text='ポイント'
                        is_first_item={true}
                    />
                </InnerBox>
                <Button
                    text='投票する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
