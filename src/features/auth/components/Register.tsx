import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../settings/Axios';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const Register = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
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

    const click_handler = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/register`, {
                email,
                password,
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
            }).then((res) => {
                if (res.status === 200) {
                    return (
                        navigation('/login')
                    );
                } else {
                    alert('アカウントの作成に失敗しました')
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Register"
                    subtitle='新規登録'
                />
                <InnerBox>
                    <Input
                        key='email'
                        value={email}
                        text='メールアドレス'
                        is_first_item={true}
                        change_action={e => setEmail(e.target.value)}
                    />
                    <Input
                        key='password'
                        value={password}
                        text='パスワード'
                        type="password"
                        change_action={e => setPassword(e.target.value)}
                    />
                    <Input
                        key='first_name'
                        value={lastName}
                        text='姓'
                        change_action={e => setLastName(e.target.value)}
                    />
                    <Input
                        key='last_name'
                        value={firstName}
                        text='名'
                        change_action={e => setFirstName(e.target.value)}
                    />
                    <Input
                        key='first_name_kana'
                        value={lastNameKana}
                        text='姓かな'
                        change_action={e => setLastNameKana(e.target.value)}
                    />
                    <Input
                        key='last_name_kana'
                        value={firstNameKana}
                        text='名かな'
                        change_action={e => setFirstNameKana(e.target.value)}
                    />
                    <Input
                        key='radio_name'
                        value={radioName}
                        text='ラジオネーム'
                        change_action={e => setRadioName(e.target.value)}
                    />
                    <Input
                        key='post_code'
                        value={postCode}
                        text='郵便番号'
                        is_post_code={true}
                        change_action={e => setPostCode(e.target.value)}
                    />
                    <Input
                        key='prefecture'
                        value={prefecture}
                        text='都道府県'
                        change_action={e => setPrefecture(e.target.value)}
                    />
                    <Input
                        key='city'
                        value={city}
                        text='市区町村'
                        change_action={e => setCity(e.target.value)}
                    />
                    <Input
                        key='house_number'
                        value={houseNumber}
                        text='番地'
                        change_action={e => setHouseNumber(e.target.value)}
                    />
                    <Input
                        key='building'
                        value={building}
                        text='建物'
                        change_action={e => setBuilding(e.target.value)}
                    />
                    <Input
                        key='room_number'
                        value={roomNumber}
                        text='部屋番号'
                        change_action={e => setRoomNumber(e.target.value)}
                    />
                    <Input
                        key='tel'
                        value={tel}
                        text='電話番号'
                        change_action={e => setTel(e.target.value)}
                    />
                </InnerBox>
                <Button
                    text='始める'
                    type='post'
                    click_action={click_handler}
                />
                <div className='text-center pb-5'>
                    <a href="/login">ログインの方はこちら</a>
                </div>
            </MainLayout>
        </>
    )
}
