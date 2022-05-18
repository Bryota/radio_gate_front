import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { Input } from '../../../components/Form';
import '../../../assets/css/radio-station.css';
import '../../../assets/css/pagination.css';

export const ProfileEdit = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Profile Edit"
                    subtitle='アカウント情報更新'
                />
                <InnerBox>
                    <Input
                        key='first_name'
                        value='瀬川'
                        text='姓'
                    />
                    <Input
                        key='last_name'
                        value='椋太'
                        text='名'
                    />
                    <Input
                        key='first_name_kana'
                        value='せがわ'
                        text='姓かな'
                    />
                    <Input
                        key='last_name_kana'
                        value='りょうた'
                        text='名かな'
                    />
                    <Input
                        key='radio_name'
                        value='ハイキングベアー'
                        text='ラジオネーム'
                    />
                    <Input
                        key='post_code'
                        value='111-1111'
                        text='郵便番号'
                        is_post_code={true}
                    />
                    <Input
                        key='prefecture'
                        value='東京都'
                        text='都道府県'
                    />
                    <Input
                        key='city'
                        value='新宿区'
                        text='市区町村'
                    />
                    <Input
                        key='house_number'
                        value='東新宿1-1-1'
                        text='番地'
                    />
                    <Input
                        key='building'
                        value='ビルビル'
                        text='建物'
                    />
                    <Input
                        key='room_number'
                        value='101'
                        text='部屋番号'
                    />
                    <Input
                        key='tel'
                        value='111-2222-3333'
                        text='電話番号'
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
