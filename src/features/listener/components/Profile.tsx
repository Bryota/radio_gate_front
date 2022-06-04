import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { ProfileItem } from './ProfileItem';
import '../../../assets/css/components/pagination.css';

type ProfileType = {
    id: number
    last_name?: string
    first_name?: string
    last_name_kana?: string
    first_name_kana?: string
    radio_name?: string
    post_code?: string
    prefecture?: string
    city?: string
    house_number?: string
    building?: string
    room_number?: string
    tel?: string
    email: string
}

export const Profile = () => {
    const [profile, setProfile] = useState<ProfileType>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const ProfileResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`);
                setProfile(ProfileResponse.data.listener);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProfile();
    }, []);

    const click_handler = () => {
        return (
            navigation(`/profile/edit`)
        );
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
                        value={profile?.last_name + '　' + profile?.first_name}
                        is_first_item={true}
                    />
                    <ProfileItem
                        label="氏名かな"
                        value={profile?.last_name_kana + '　' + profile?.first_name_kana}
                    />
                    <ProfileItem
                        label="ラジオネーム"
                        value={profile?.radio_name}
                    />
                    <ProfileItem
                        label="郵便番号"
                        value={'〒' + profile?.post_code}
                    />
                    <ProfileItem
                        label="住所"
                        value={`${profile?.prefecture}${profile?.city}${profile?.house_number}${profile?.building}${profile?.room_number}`}
                    />
                    <ProfileItem
                        label="電話番号"
                        value={profile?.tel}
                    />
                    <ProfileItem
                        label="メールアドレス"
                        value={profile?.email}
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
