import axios from '../../../settings/Axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form';
import { Button, Loading } from '../../../components/Elements';
import { EditInputItem } from './EditInputItem';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type UrlParamsType = {
    id: string
}

type CornerType = {
    id: string
    name: string
}

type validatedArrayType = {
    key: string,
    message: string
}

export const EditMyRadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [Id, setId] = useState<string>();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [corners, setCorners] = useState<CornerType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchRadioProgram = async () => {
            try {
                const MyRadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`);
                let myRadioProgram = MyRadioProgramResponse.data.listener_my_program;
                setId(myRadioProgram.id);
                setName(myRadioProgram.name);
                setEmail(myRadioProgram.email);

                const CornerResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners?listener_my_program=${urlParams.id}`);
                setCorners(CornerResponse.data.my_program_corners.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const validation = () => {
        const validationCorners = corners.map((corner, index) => {
            return {
                key: `corner${index}`,
                value: corner.name,
                type: 'require'
            }
        })
        const result = validationCheck(
            [
                {
                    key: 'name',
                    value: name,
                    type: 'require'
                },
                {
                    key: 'name',
                    value: name,
                    type: 'max|150'
                },
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
                    key: 'email',
                    value: email,
                    type: 'max|150'
                },
            ].concat(validationCorners)
        )
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const addCorner = () => {
        setCorners([...corners, { id: '', name: '' }]);
    }

    const changeCorner = (value: string, i: number): void => {
        setCorners(
            corners.map((corner, index): CornerType => {
                return {
                    id: corner.id,
                    name: i === index ? value : corner.name
                }
            })
        )
    }

    const deleteCorner = async (id: number) => {
        try {
            await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners/${id}`);
            return (
                navigation('/my_radio_programs', { state: { flash_message: 'コーナーを削除しました' } })
            )
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCornerForm = (i: number) => {
        setCorners(
            corners.filter((corner, index) => {
                return i !== index;
            })
        )
    }

    const click_handler = async () => {
        if (validation()) {
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`, {
                name,
                // TODO: メールアドレスを変更しないと更新できない
                email
            });
            corners.map(async (corner) => {
                if (corner.id) {
                    await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners/${corner.id}`, {
                        'listener_my_program_id': Id,
                        'name': corner.name
                    });
                } else {
                    await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners`, {
                        'listener_my_program_id': Id,
                        'name': corner.name
                    })
                }
            })
            navigation(`/my_radio_program/${urlParams.id}`, { state: { flash_message: 'マイラジオ番組を更新しました' } })
        } catch (err) {
            console.log(err)
        }
    }

    const delete_handler = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`);
            return (
                navigation('/my_radio_programs', { state: { flash_message: 'マイラジオ番組を削除しました' } })
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
                    title="My Radio Program Edit"
                    subtitle='マイラジオ番組更新'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='ラジオ番組名'
                        value={name}
                        is_first_item={true}
                        change_action={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Input
                        key='email'
                        text='メールアドレス'
                        value={email}
                        type='email'
                        change_action={e => setEmail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                    />
                    <p className="text-left mt-5 h3">番組コーナー</p>
                    {
                        corners.map((corner, index) => {
                            return (
                                <EditInputItem
                                    myProgeamConrerId={Number(corner.id)}
                                    key={`corner${index}`}
                                    text='コーナー'
                                    value={corner.name}
                                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === `corner${index}`)}
                                    changeAction={e => changeCorner(e.target.value, index)}
                                    deleteAction={(id) => { deleteCorner(id) }}
                                    deleteFormAction={() => { deleteCornerForm(index) }}
                                />
                            )
                        })
                    }
                    <Button
                        text='コーナーを増やす'
                        type='get'
                        line_left={true}
                        click_action={addCorner}
                    />
                </InnerBox>
                <Button
                    text='更新する'
                    type='post'
                    click_action={click_handler}
                />
                <Button
                    text='削除する'
                    type='delete'
                    click_action={delete_handler}
                />
            </MainLayout>
        </>
    )
}
