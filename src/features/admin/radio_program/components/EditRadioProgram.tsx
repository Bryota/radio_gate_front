import axios from '../../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

import { UrlParamsType } from '../../../../types/common';

type RadioProgramType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
    radio_station: {
        id: number
        name: string
    }
}

export const AdminEditRadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [radioProgram, setRadioProgram] = useState<RadioProgramType>();
    const [name, setName] = useState<string | undefined>(radioProgram?.name);
    const [email, setEmail] = useState<string | undefined>(radioProgram?.email);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs/${urlParams.id}`);
                setRadioProgram(RadioProgramResponse.data.radio_program);

            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

    const click_handler = async () => {
        if (name === undefined) {
            setName(radioProgram?.name);
        }
        if (email === undefined) {
            setEmail(radioProgram?.email);
        }
        await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs/${radioProgram?.id}`, {
            // TODO: idは設定しなくても良くする
            radio_station_id: radioProgram?.radio_station.id,
            name: name,
            // TODO: email変更しないとバリデーションに引っかかる
            email: email
        }).then(res => {
            // TODO: エラー時の処理追加d
            if (res.status === 201) {
                navigation(`/admin/radio_programs/${radioProgram?.radio_station.id}`)
            } else {
                console.log(res.data.message);
            }
        });
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ番組編集"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminInput
                            key='radio_station'
                            text='radio_station'
                            value={radioProgram?.radio_station.name}
                            is_first_item={true}
                            is_disable={true}
                        />
                        <AdminInput
                            key='name'
                            text='name'
                            value={radioProgram?.name}
                            changeAction={e => setName(e.target.value)}
                        />
                        <AdminInput
                            key='email'
                            text='email'
                            value={radioProgram?.email}
                            changeAction={e => setEmail(e.target.value)}
                        />
                        <AdminButton
                            text='更新'
                            type='post'
                            click_action={click_handler}
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
