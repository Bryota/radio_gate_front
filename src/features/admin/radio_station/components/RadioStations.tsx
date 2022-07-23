import axios from '../../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRadioStationList } from './RadioStationList';
import { useFetchApiData } from '../../../../hooks/admin/useFetchApiData';

import { RadioStationsResponseType } from '../../../../types/listener';

export const AdminRadioStations = () => {
    const navigation = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: radioStations } = useFetchApiData<RadioStationsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-stations?page=${currentPage}`, currentPage);

    const click_handler = () => {
        return navigation('/admin/radio_station/create')
    }

    console.log(radioStations)

    const delete_radio_station = async (id: number | undefined) => {
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
                            radioStations?.data.map((radioStation, index) => {
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
