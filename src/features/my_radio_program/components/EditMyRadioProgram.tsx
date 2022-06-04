import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form';
import { Button } from '../../../components/Elements';
import { EditInputItem } from './EditInputItem';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type UrlParamsType = {
    id: string
}

type MyRadioProgramType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

type CornerType = {
    id: string
    name: string
}

export const EditMyRadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [myRadioProgram, setMyRadioProgram] = useState<MyRadioProgramType>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [corners, setCorners] = useState<CornerType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const MyRadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`);
                setMyRadioProgram(MyRadioProgramResponse.data.listener_my_program);
                const CornerResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners?listener_my_program=${urlParams.id}`);
                setCorners(CornerResponse.data.my_program_corners);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

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
                navigation('/my_radio_programs')
            )
        } catch (err) {
            console.log(err)
        }
    }

    const click_handler = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`, {
                name,
                // TODO: メールアドレスを変更しないと更新できない
                email
            });
            corners.map(async (corner) => {
                await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners/${corner.id}`, {
                    'listener_my_program_id': myRadioProgram?.id,
                    'name': corner.name
                });
                alert('更新しました')
            })
        } catch (err) {
            console.log(err)
        }
    }

    const delete_handler = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`);
            return (
                navigation('/my_radio_programs')
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="My Radio Program Edit"
                    subtitle='マイラジオ番組更新'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='ラジオ番組名'
                        value={myRadioProgram?.name}
                        is_first_item={true}
                        change_action={e => setName(e.target.value)}
                    />
                    <Input
                        key='email'
                        text='メールアドレス'
                        value={myRadioProgram?.email}
                        type='email'
                        change_action={e => setEmail(e.target.value)}
                    />
                    <p className="text-left mt-5 h3">番組コーナー</p>
                    {
                        corners.map((corner, index) => {
                            return (
                                <EditInputItem
                                    my_progeam_conrer_id={Number(corner.id)}
                                    key={`corner${index}`}
                                    text='コーナー'
                                    value={corner.name}
                                    change_action={e => changeCorner(e.target.value, index)}
                                    click_action={(id) => { deleteCorner(id) }}
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
