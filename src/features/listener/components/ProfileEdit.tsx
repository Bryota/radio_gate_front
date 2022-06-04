import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { Input } from '../../../components/Form';
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


export const ProfileEdit = () => {
    const [profile, setProfile] = useState<ProfileType>();
    const [lastName, setLastName] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [lastNameKana, setLastNameKana] = useState<string>();
    const [firstNameKana, setFirstNameKana] = useState<string>();
    const [radioName, setRadioName] = useState<string>();
    const [postCode, setPostCode] = useState<string>();
    const [prefecture, setPrefecture] = useState<string>();
    const [city, setCity] = useState<string>();
    const [houseNumber, setHouseNumber] = useState<string>();
    const [building, setBuilding] = useState<string>();
    const [roomNumber, setRoomNumber] = useState<string>();
    const [tel, setTel] = useState<string>();
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

    const click_handler = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`, {
                last_name: lastName,
                first_name: firstName,
                last_name_kana: lastNameKana,
                first_name_kana: firstNameKana,
                radio_name: radioName,
                post_code: postCode,
                prefecture: prefecture,
                city: city,
                house_number: houseNumber,
                building: building,
                room_number: roomNumber,
                tel: tel
            });
            alert('更新しました');
        } catch (err) {
            console.log(err)
        }
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
                        value={profile?.last_name}
                        text='姓'
                        change_action={e => setLastName(e.target.value)}
                    />
                    <Input
                        key='last_name'
                        value={profile?.first_name}
                        text='名'
                        change_action={e => setFirstName(e.target.value)}
                    />
                    <Input
                        key='first_name_kana'
                        value={profile?.last_name_kana}
                        text='姓かな'
                        change_action={e => setLastNameKana(e.target.value)}
                    />
                    <Input
                        key='last_name_kana'
                        value={profile?.first_name_kana}
                        text='名かな'
                        change_action={e => setFirstNameKana(e.target.value)}
                    />
                    <Input
                        key='radio_name'
                        value={profile?.radio_name}
                        text='ラジオネーム'
                        change_action={e => setRadioName(e.target.value)}
                    />
                    <Input
                        key='post_code'
                        value={profile?.post_code}
                        text='郵便番号'
                        is_post_code={true}
                        change_action={e => setPostCode(e.target.value)}
                    />
                    <Input
                        key='prefecture'
                        value={profile?.prefecture}
                        text='都道府県'
                        change_action={e => setPrefecture(e.target.value)}
                    />
                    <Input
                        key='city'
                        value={profile?.city}
                        text='市区町村'
                        change_action={e => setCity(e.target.value)}
                    />
                    <Input
                        key='house_number'
                        value={profile?.house_number}
                        text='番地'
                        change_action={e => setHouseNumber(e.target.value)}
                    />
                    <Input
                        key='building'
                        value={profile?.building}
                        text='建物'
                        change_action={e => setBuilding(e.target.value)}
                    />
                    <Input
                        key='room_number'
                        value={profile?.room_number}
                        text='部屋番号'
                        change_action={e => setRoomNumber(e.target.value)}
                    />
                    <Input
                        key='tel'
                        value={profile?.tel}
                        text='電話番号'
                        change_action={e => setTel(e.target.value)}
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
