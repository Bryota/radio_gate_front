import defaultAxios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../settings/Axios';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';
import { validationCheck } from '../../../modules/validation/validationCheck';

type validatedArrayType = {
    key: string,
    message: string
}

export const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    const validation = () => {
        const result = validationCheck(
            [
                {
                    key: 'email',
                    value: email,
                    type: 'require'
                },
                {
                    key: 'email',
                    value: email,
                    type: 'email'
                },
                {
                    key: 'password',
                    value: password,
                    type: 'require'
                },
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
        validateEmailUnique(email)
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const validateEmailUnique = async (email: string) => {
        try {
            await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener/unique_email?email=${email}`)
                .then((res) => {
                    if (res.data.is_unique_email == false) {
                        setValidationMessages([...validationMessages, {
                            key: 'email',
                            message: 'メールアドレスが既に使われています。'
                        }])
                    }
                    return res.data.is_unique_email
                })
        } catch (err) {
            console.log(err)
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

    const registerAccount = async () => {
        if (validation()) {
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/register`, {
                email,
                password,
                last_name: lastName,
                first_name: firstName,
                last_name_kana: lastNameKana,
                first_name_kana: firstNameKana,
                radio_name: radioName,
                post_code: Number(postCode),
                prefecture: prefecture,
                city: city,
                house_number: houseNumber,
                building: building,
                room_number: roomNumber,
                tel: tel
            }).then(async (res) => {
                if (res.status === 200) {
                    await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/sanctum/csrf-cookie`)
                        .then(() => {
                            return (
                                navigation('/message_post')
                            );
                        })
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
                        changeAction={e => setEmail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                    />
                    <Input
                        key='password'
                        value={password}
                        text='パスワード'
                        type="password"
                        changeAction={e => setPassword(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'password')}
                    />
                    <Input
                        key='first_name'
                        value={lastName}
                        text='姓'
                        changeAction={e => setLastName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'lastName')}
                    />
                    <Input
                        key='last_name'
                        value={firstName}
                        text='名'
                        changeAction={e => setFirstName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'firstName')}
                    />
                    <Input
                        key='first_name_kana'
                        value={lastNameKana}
                        text='姓かな'
                        changeAction={e => setLastNameKana(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'lastNameKana')}
                    />
                    <Input
                        key='last_name_kana'
                        value={firstNameKana}
                        text='名かな'
                        changeAction={e => setFirstNameKana(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'firstNameKana')}
                    />
                    <Input
                        key='radio_name'
                        value={radioName}
                        text='ラジオネーム'
                        changeAction={e => setRadioName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'radioName')}
                    />
                    <Input
                        key='post_code'
                        value={postCode}
                        text='郵便番号'
                        is_post_code={true}
                        searchAddressByPostCode={(postCode => searchAddressByPostCode(postCode))}
                        changeAction={e => setPostCode(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'postCode')}
                    />
                    <Input
                        key='prefecture'
                        value={prefecture}
                        text='都道府県'
                        changeAction={e => setPrefecture(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'prefecture')}
                    />
                    <Input
                        key='city'
                        value={city}
                        text='市区町村'
                        changeAction={e => setCity(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'city')}
                    />
                    <Input
                        key='house_number'
                        value={houseNumber}
                        text='番地'
                        changeAction={e => setHouseNumber(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'houseNumber')}
                    />
                    <Input
                        key='building'
                        value={building}
                        text='建物'
                        changeAction={e => setBuilding(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'building')}
                    />
                    <Input
                        key='room_number'
                        value={roomNumber}
                        text='部屋番号'
                        changeAction={e => setRoomNumber(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'roomNumber')}
                    />
                    <Input
                        key='tel'
                        value={tel}
                        text='電話番号'
                        changeAction={e => setTel(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'tel')}
                    />
                </InnerBox>
                <Button
                    text='始める'
                    type='post'
                    clickAction={registerAccount}
                />
                <div className='text-center pb-5'>
                    <a href="/login">ログインの方はこちら</a>
                </div>
            </MainLayout>
        </>
    )
}
