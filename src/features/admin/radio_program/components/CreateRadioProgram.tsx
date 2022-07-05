import axios from '../../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';
import { AdminSelect } from '../../../../components/Form/admin/Select';

import { RadioStationsType } from '../../../../types/admin';

export const AdminCreateRadioProgram = () => {
    const [radioStations, setRadioStations] = useState<RadioStationsType[]>([]);
    const [radioStationId, setRadioStationId] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioStations = async () => {
            try {
                const RadioStationsresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-stations`);
                setRadioStations(RadioStationsresponse.data.radio_stations)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioStations();
    }, []);

    const set_radio_station = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRadioStationId(e.target.value);
    }

    const click_handler = async () => {
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs`, {
            radio_station_id: radioStationId,
            name,
            email
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                navigation(`/admin/radio_programs/${radioStationId}`)
            } else {
                console.log(res.data.message);
            }
        });
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ番組作成"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminSelect
                            key='radio_station'
                            text='radio_station'
                            items={radioStations}
                            change_action={e => set_radio_station(e)}
                        />
                        <AdminInput
                            key='name'
                            text='name'
                            change_action={e => setName(e.target.value)}
                        />
                        <AdminInput
                            key='email'
                            text='email'
                            change_action={e => setEmail(e.target.value)}
                        />
                        <AdminButton
                            text='作成'
                            type='post'
                            click_action={click_handler}
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
