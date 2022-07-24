import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { ProfileItem } from './ProfileItem';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { useFlashMessage } from '../../../hooks/useFlashMessage';
import { nullToNoSetting } from '../../../modules/display/nullToNoSetting';

import { ProfileResponseType } from '../../../types/listener';

import '../../../assets/css/components/pagination.css';
import { useEffect } from 'react';

export const Profile = () => {
    const navigation = useNavigate();
    const { apiData: profile, isLoading, fetchApiData: fetchListener } = useFetchApiData<ProfileResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`);
    const flashMessage = useFlashMessage();

    useEffect(() => {
        fetchListener();
    }, []);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : null}
                {flashMessage ? <FlashMessage message={flashMessage} /> : null}
                <Pagehead
                    title="Profile"
                    subtitle='アカウント情報'
                />
                <InnerBox>
                    <ProfileItem
                        label="氏名"
                        value={nullToNoSetting(profile?.full_name)}
                        is_first_item={true}
                    />
                    <ProfileItem
                        label="氏名かな"
                        value={nullToNoSetting(profile?.full_name_kana)}
                    />
                    <ProfileItem
                        label="ラジオネーム"
                        value={nullToNoSetting(profile?.radio_name)}
                    />
                    <ProfileItem
                        label="郵便番号"
                        value={'〒' + nullToNoSetting(profile?.post_code)}
                    />
                    <ProfileItem
                        label="住所"
                        value={nullToNoSetting(profile?.address)}
                    />
                    <ProfileItem
                        label="電話番号"
                        value={nullToNoSetting(profile?.tel)}
                    />
                    <ProfileItem
                        label="メールアドレス"
                        value={profile?.email}
                    />
                </InnerBox>
                <Button
                    text='編集する'
                    type='post'
                    clickAction={() => navigation(`/profile/edit`)}
                />
            </MainLayout>
        </>
    )
}
