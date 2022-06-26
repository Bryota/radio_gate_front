import axios from '../../../settings/Axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form';
import { Button } from '../../../components/Elements';
import { CreateCornerInput } from './CreateCornerInput';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type CornerType = {
    id: string
    name: string
}

type validatedArrayType = {
    key: string,
    message: string
}

export const CreateMyRadioProgram = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [corners, setCorners] = useState<CornerType[]>([]);
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
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

    const click_handler = async () => {
        if (validation()) {
            return;
        }
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs`, {
            name,
            email
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                let my_radio_program_id = res.data.listener_my_program.id;
                corners.map(async (corner) => {
                    await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners`, {
                        'listener_my_program_id': my_radio_program_id,
                        'name': corner.name
                    })
                });
                navigation('/my_radio_programs', { state: { flash_message: '新しいマイラジオ番組を作成しました' } })
            } else {
                navigation('/my_radio_programs', { state: { flash_message: 'マイラジオ番組の作成に失敗しました' } })
            }
        }).catch(err => {
            console.log(err)
        });
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

    const deleteCornerForm = (i: number) => {
        setCorners(
            corners.filter((corner, index) => {
                return i !== index;
            })
        )
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="My Radio Program Create"
                    subtitle='マイラジオ番組作成'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='ラジオ番組名'
                        is_first_item={true}
                        change_action={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Input
                        key='email'
                        text='メールアドレス'
                        type='email'
                        change_action={e => setEmail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                    />
                    <p className="text-left mt-5 h3">番組コーナー</p>
                    {
                        corners.map((corner, index) => {
                            return (
                                <CreateCornerInput
                                    myProgeamConrerId={Number(corner.id)}
                                    key={`corner${index}`}
                                    text='コーナー'
                                    value={corner.name}
                                    validationMessages={validationMessages.filter(validationMessage => validationMessage.key === `corner${index}`)}
                                    changeAction={e => changeCorner(e.target.value, index)}
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
                    text='作成する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
