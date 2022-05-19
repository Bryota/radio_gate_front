import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { ProfileItem } from './ProfileItem';
import '../../../assets/css/pagination.css';

export const Profile = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Profile"
                    subtitle='アカウント情報'
                />
                <InnerBox>
                    <ProfileItem
                        label="氏名"
                        value="瀬川　椋太"
                        is_first_item={true}
                    />
                    <ProfileItem
                        label="氏名かな"
                        value="せがわ　りょうた"
                    />
                    <ProfileItem
                        label="ラジオネーム"
                        value="ハイキングベアー"
                    />
                    <ProfileItem
                        label="郵便番号"
                        value="〒111-1111"
                    />
                    <ProfileItem
                        label="住所"
                        value="東京都新宿区東新宿1-1-1ビルビル101"
                    />
                    <ProfileItem
                        label="電話番号"
                        value="設定されていません"
                        no_value={true}
                    />
                    <ProfileItem
                        label="メールアドレス"
                        value="test@example.com"
                    />
                </InnerBox>
                <Button
                    text='編集する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
