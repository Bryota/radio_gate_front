import defaultAxios from 'axios';

import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { Input } from '../../../components/Form';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { validatedArrayType } from '../../../types/common';
import { ProfileResponseType } from '../../../types/listener';

import '../../../assets/css/components/pagination.css';

export const ProfileEdit = () => {
    const [lastName, setLastName] = useState<string | undefined>('');
    const [firstName, setFirstName] = useState<string | undefined>('');
    const [lastNameKana, setLastNameKana] = useState<string | undefined>('');
    const [firstNameKana, setFirstNameKana] = useState<string | undefined>('');
    const [radioName, setRadioName] = useState<string | undefined>('');
    const [postCode, setPostCode] = useState<string | undefined>('');
    const [prefecture, setPrefecture] = useState<string | undefined>('');
    const [city, setCity] = useState<string | undefined>('');
    const [houseNumber, setHouseNumber] = useState<string | undefined>('');
    const [building, setBuilding] = useState<string | undefined>('');
    const [roomNumber, setRoomNumber] = useState<string | undefined>('');
    const [tel, setTel] = useState<string | undefined>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();
    const { apiData: profile, isLoading, fetchApiData: fetchListener } = useFetchApiData<ProfileResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`);

    useEffect(() => {
        fetchListener();
    }, []);

    useEffect(() => {
        setLastName(profile?.last_name);
        setFirstName(profile?.first_name);
        setLastNameKana(profile?.last_name_kana);
        setFirstNameKana(profile?.first_name_kana);
        setRadioName(profile?.radio_name);
        setPostCode(profile?.post_code ? profile?.post_code : undefined);
        setPrefecture(profile?.prefecture);
        setCity(profile?.city);
        setHouseNumber(profile?.house_number);
        setBuilding(profile?.building);
        setRoomNumber(profile?.room_number);
        setTel(profile?.tel);
    }, [profile]);

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

    const editProfile = async () => {
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
                        changeAction={e => setLastName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'lastName')}
                        data_testid='profile-input-last-name'
                    />
                    <Input
                        key='firstName'
                        value={firstName}
                        text='名'
                        changeAction={e => setFirstName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'firstName')}
                        data_testid='profile-input-first-name'
                    />
                    <Input
                        key='lastNameKana'
                        value={lastNameKana}
                        text='姓かな'
                        changeAction={e => setLastNameKana(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'lastNameKana')}
                        data_testid='profile-input-last-name-kana'
                    />
                    <Input
                        key='firstNameKana'
                        value={firstNameKana}
                        text='名かな'
                        changeAction={e => setFirstNameKana(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'firstNameKana')}
                        data_testid='profile-input-first-name-kana'
                    />
                    <Input
                        key='radioName'
                        value={radioName}
                        text='ラジオネーム'
                        changeAction={e => setRadioName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'radioName')}
                        data_testid='profile-input-radio-name'
                    />
                    <Input
                        key='postCode'
                        value={postCode}
                        text='郵便番号'
                        is_post_code={true}
                        searchAddressByPostCode={(postCode => searchAddressByPostCode(postCode))}
                        changeAction={e => setPostCode(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'postCode')}
                        data_testid='profile-input-post-code'
                    />
                    <Input
                        key='prefecture'
                        value={prefecture}
                        text='都道府県'
                        changeAction={e => setPrefecture(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'prefecture')}
                        data_testid='profile-input-prefecture'
                    />
                    <Input
                        key='city'
                        value={city}
                        text='市区町村'
                        changeAction={e => setCity(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'city')}
                        data_testid='profile-input-city'
                    />
                    <Input
                        key='houseNumber'
                        value={houseNumber}
                        text='番地'
                        changeAction={e => setHouseNumber(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'houseNumber')}
                        data_testid='profile-input-house-number'
                    />
                    <Input
                        key='building'
                        value={building}
                        text='建物'
                        changeAction={e => setBuilding(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'building')}
                        data_testid='profile-input-building'
                    />
                    <Input
                        key='roomNumber'
                        value={roomNumber}
                        text='部屋番号'
                        changeAction={e => setRoomNumber(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'roomNumber')}
                        data_testid='profile-input-room-number'
                    />
                    <Input
                        key='tel'
                        value={tel}
                        text='電話番号'
                        changeAction={e => setTel(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'tel')}
                        data_testid='profile-input-tel'
                    />
                </InnerBox>
                <Button
                    text='更新する'
                    type='post'
                    clickAction={editProfile}
                    data_testid='profile-button-edit'
                />
            </MainLayout>
        </>
    )
}
