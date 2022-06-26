import defaultAxios from 'axios';

import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { Input } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
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

type validatedArrayType = {
    key: string,
    message: string
}

export const ProfileEdit = () => {
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastNameKana, setLastNameKana] = useState<string>('');
    const [firstNameKana, setFirstNameKana] = useState<string>('');
    const [radioName, setRadioName] = useState<string>('');
    const [postCode, setPostCode] = useState<string>('');
    const [prefecture, setPrefecture] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [houseNumber, setHouseNumber] = useState<string>('');
    const [building, setBuilding] = useState<string>('');
    const [roomNumber, setRoomNumber] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchProfile = async () => {
            try {
                const ProfileResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`);
                setLastName(ProfileResponse.data.listener.last_name);
                setFirstName(ProfileResponse.data.listener.first_name);
                setLastNameKana(ProfileResponse.data.listener.last_name_kana);
                setFirstNameKana(ProfileResponse.data.listener.last_name_kana);
                setRadioName(ProfileResponse.data.listener.radio_name);
                setPostCode(ProfileResponse.data.listener.post_code);
                setPrefecture(ProfileResponse.data.listener.prefecture);
                setCity(ProfileResponse.data.listener.city);
                setHouseNumber(ProfileResponse.data.listener.house_number);
                setBuilding(ProfileResponse.data.listener.building);
                setRoomNumber(ProfileResponse.data.listener.roomNumber);
                setTel(ProfileResponse.data.listener.tel);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProfile();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const validation = () => {
        const result = validationCheck(
            [
                {
                    key: 'lastName',
                    value: lastName,
                    type: 'max|150'
                },
                {
                    key: 'firstName',
                    value: firstName,
                    type: 'max|150'
                },
                {
                    key: 'lastNameKana',
                    value: lastNameKana,
                    type: 'max|150'
                },
                {
                    key: 'firstNameKana',
                    value: firstNameKana,
                    type: 'max|150'
                },
                {
                    key: 'radioName',
                    value: radioName,
                    type: 'max|150'
                },
                {
                    key: 'postCode',
                    value: postCode,
                    type: 'integer'
                },
                {
                    key: 'prefecture',
                    value: prefecture,
                    type: 'max|150'
                },
                {
                    key: 'city',
                    value: city,
                    type: 'max|150'
                },
                {
                    key: 'houseNumber',
                    value: houseNumber,
                    type: 'max|255'
                },
                {
                    key: 'building',
                    value: building,
                    type: 'max|255'
                },
                {
                    key: 'roomNumber',
                    value: roomNumber,
                    type: 'max|255'
                },
                {
                    key: 'tel',
                    value: tel,
                    type: 'max|100'
                }
            ]
        )
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const searchAddressByPostCode = async (postCode: string) => {
        try {
            await defaultAxios.get(`${process.env.REACT_APP_ZIPCLOUD_API_URL}?zipcode=${postCode}`)
                .then((res) => {
                    if (res.data.results !== null) {
                        setPrefecture(res.data.results[0].address1);
                        setCity(res.data.results[0].address2);
                        setHouseNumber(res.data.results[0].address3);
                        setValidationMessages(
                            // TODO: validationMessagesにtype入れてそれで判別した方がいいかも
                            validationMessages.filter((validationMessage) => (validationMessage.message !== '郵便番号を正しく入力してください。'))
                        );
                    } else {
                        setPrefecture('');
                        setCity('');
                        setHouseNumber('');
                        let existsValidationMessage = validationMessages.some(validationMessage => validationMessage.message === '郵便番号を正しく入力してください。')
                        if
                            (!existsValidationMessage) {
                            setValidationMessages([...validationMessages, {
                                key: 'postCode',
                                message: '郵便番号を正しく入力してください。'
                            }]);
                        }
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    const click_handler = async () => {
        if (validation()) {
            return;
        }
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
            return (
                navigation('/profile', { state: { flash_message: 'アカウント情報を更新しました' } })
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Profile Edit"
                    subtitle='アカウント情報更新'
                />
                <InnerBox>
                    <Input
                        key='lastName'
                        value={lastName}
                        text='姓'
                        change_action={e => setLastName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'lastName')}
                    />
                    <Input
                        key='firstName'
                        value={firstName}
                        text='名'
                        change_action={e => setFirstName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'firstName')}
                    />
                    <Input
                        key='lastNameKana'
                        value={lastNameKana}
                        text='姓かな'
                        change_action={e => setLastNameKana(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'lastNameKana')}
                    />
                    <Input
                        key='firstNameKana'
                        value={firstNameKana}
                        text='名かな'
                        change_action={e => setFirstNameKana(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'firstNameKana')}
                    />
                    <Input
                        key='radioName'
                        value={radioName}
                        text='ラジオネーム'
                        change_action={e => setRadioName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'radioName')}
                    />
                    <Input
                        key='postCode'
                        value={postCode}
                        text='郵便番号'
                        is_post_code={true}
                        searchAddressByPostCode={(postCode => searchAddressByPostCode(postCode))}
                        change_action={e => setPostCode(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'postCode')}
                    />
                    <Input
                        key='prefecture'
                        value={prefecture}
                        text='都道府県'
                        change_action={e => setPrefecture(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'prefecture')}
                    />
                    <Input
                        key='city'
                        value={city}
                        text='市区町村'
                        change_action={e => setCity(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'city')}
                    />
                    <Input
                        key='houseNumber'
                        value={houseNumber}
                        text='番地'
                        change_action={e => setHouseNumber(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'houseNumber')}
                    />
                    <Input
                        key='building'
                        value={building}
                        text='建物'
                        change_action={e => setBuilding(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'building')}
                    />
                    <Input
                        key='roomNumber'
                        value={roomNumber}
                        text='部屋番号'
                        change_action={e => setRoomNumber(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'roomNumber')}
                    />
                    <Input
                        key='tel'
                        value={tel}
                        text='電話番号'
                        change_action={e => setTel(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'tel')}
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
