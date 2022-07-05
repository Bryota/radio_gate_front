import axios from '../../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRadioProgramList } from './RadioProgramList';

import { RadioProgramsUrlParamsType, RadioProgramType } from '../../../../types/listener';

export const AdminRadioPrograms = () => {
    const urlParams = useParams<RadioProgramsUrlParamsType>();
    const [radioPrograms, setRadioPrograms] = useState<RadioProgramType[]>([]);
    const [radioStationName, setRadioStationName] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioPrograms = async () => {
            try {
                const RadioStationNameResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-station/${urlParams.radioStationId}/name`);
                setRadioStationName(RadioStationNameResponse.data.radio_station_name);

                const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs?radio_station=${urlParams.radioStationId}`);
                setRadioPrograms(RadioProgramsResponse.data.radio_programs);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioPrograms();
    }, []);

    const click_handler = () => {
        return navigation('/admin/radio_program/create');
    }

    const delete_radio_program = async (id: number | undefined) => {
        try {
            const RadioProgramresponse = await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs/${id}`);
            if (RadioProgramresponse.status === 200) {
                window.location.reload();
            } else {
                alert(RadioProgramresponse.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ番組一覧"
                />
                <div className="text-center">
                    <h2>{radioStationName}</h2>
                </div>
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
                            radioPrograms.map((radioProgram, index) => {
                                return (
                                    <AdminRadioProgramList
                                        key={radioProgram.id}
                                        id={radioProgram.id}
                                        name={radioProgram.name}
                                        is_first_item={index === 0 ? true : false}
                                        click_action={() => delete_radio_program(radioProgram.id)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
