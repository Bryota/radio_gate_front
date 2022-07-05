import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { ProfileItem } from './ProfileItem';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { ProfileResponseType } from '../../../types/listener';

import '../../../assets/css/components/pagination.css';

export const Profile = () => {
    const location = useLocation();
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
    const navigation = useNavigate();
    const { apiData: profile, isLoading } = useFetchApiData<ProfileResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                {locationParams && locationParams.hasOwnProperty('flash_message') ? <FlashMessage message={locationParams.flash_message} /> : <></>}
                <Pagehead
                    title="Profile"
                    subtitle='アカウント情報'
                />
                <InnerBox>
                    <ProfileItem
                        label="氏名"
                        value={profile?.listener.last_name + '　' + profile?.listener.first_name}
                        is_first_item={true}
                    />
                    <ProfileItem
                        label="氏名かな"
                        value={profile?.listener.last_name_kana + '　' + profile?.listener.first_name_kana}
                    />
                    <ProfileItem
                        label="ラジオネーム"
                        value={profile?.listener.radio_name}
                    />
                    <ProfileItem
                        label="郵便番号"
                        value={'〒' + profile?.listener.post_code}
                    />
                    <ProfileItem
                        label="住所"
                        value={`${profile?.listener.prefecture}${profile?.listener.city}${profile?.listener.house_number}${profile?.listener.building}${profile?.listener.room_number}`}
                    />
                    <ProfileItem
                        label="電話番号"
                        value={profile?.listener.tel}
                    />
                    <ProfileItem
                        label="メールアドレス"
                        value={profile?.listener.email}
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
