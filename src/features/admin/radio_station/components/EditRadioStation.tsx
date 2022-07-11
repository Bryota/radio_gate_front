import axios from '../../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

import { UrlParamsType } from '../../../../types/common';
import { RadioStationsType } from '../../../../types/admin/';

export const AdminEditRadioStation = () => {
    const urlParams = useParams<UrlParamsType>();
    const [radioStation, setRadioStation] = useState<RadioStationsType>();
    const [name, setName] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioStation = async () => {
            try {
                const RadioStationresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-stations/${urlParams.id}`);
                setRadioStation(RadioStationresponse.data.radio_station)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioStation();
    }, []);

    const click_handler = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-stations/${urlParams.id}`, {
                name,
            });
            navigation('/admin/radio_stations')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ局編集"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminInput
                            key='name'
                            text='name'
                            value={radioStation?.name}
                            is_first_item={true}
                            changeAction={e => setName(e.target.value)}
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
