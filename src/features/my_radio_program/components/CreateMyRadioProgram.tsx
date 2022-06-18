import axios from '../../../settings/Axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form';
import { Button } from '../../../components/Elements';
import { CreateCornerInput } from './CreateCornerInput';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type CornerType = {
    id: string
    name: string
}

export const CreateMyRadioProgram = () => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [corners, setCorners] = useState<CornerType[]>([]);
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

    const click_handler = async () => {
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
            } else {
                console.log(res.data.message);
            }
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
                    />
                    <Input
                        key='email'
                        text='メールアドレス'
                        type='email'
                        change_action={e => setEmail(e.target.value)}
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
