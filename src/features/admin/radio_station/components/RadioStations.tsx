import axios from '../../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRadioStationList } from './RadioStationList';

type RadioStationsType = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export const AdminRadioStations = () => {
    const [radioStations, setRadioStations] = useState<RadioStationsType[]>([]);
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

    const click_handler = () => {
        return navigation('/admin/radio_station/create')
    }

    const delete_radio_station = async (id: number) => {
        try {
            const RadioStationsresponse = await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-stations/${id}`);
            if (RadioStationsresponse.status === 200) {
                window.location.reload();
            } else {
                alert(RadioStationsresponse.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ局一覧"
                />
                <AdminButton
                    text='追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        {
                            radioStations.map((radioStation, index) => {
                                return (
                                    <AdminRadioStationList
                                        key={radioStation.id}
                                        id={radioStation.id}
                                        name={radioStation.name}
                                        is_first_item={index === 0 ? true : false}
                                        click_action={() => delete_radio_station(radioStation.id)}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
