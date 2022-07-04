import axios from '../../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminInput } from '../../../../components/Form/admin/Input';
import { Corners } from './Corners';

type UrlParamsType = {
    id: string
}

type RadioProgramType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
    radio_station: {
        name: string
    }
}

type ProgramCornersType = {
    id: number
    radio_program_id: number
    name: string
}

export const AdminRadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [radioProgram, setRadioProgram] = useState<RadioProgramType>();
    const [programCorners, setProgramCorners] = useState<ProgramCornersType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs/${urlParams.id}`);
                setRadioProgram(RadioProgramResponse.data.radio_program);
                const ProgramConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/program-corners?radio_program=${urlParams.id}`);
                setProgramCorners(ProgramConrernsResponse.data.program_corners);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

    const click_handler = () => {
        return navigation(`/admin/radio_programs/${urlParams.id}`)
    }

    const delete_corner = async (id: number) => {
        try {
            const ProgramCornerresponse = await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/program-corners/${id}`);
            if (ProgramCornerresponse.status === 200) {
                window.location.reload();
            } else {
                alert(ProgramCornerresponse.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ番組"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-9">
                        <div className='m-auto w-80'>
                            <span className="underline-green font-30">{radioProgram?.name}</span>
                        </div>
                        <div>
                            <AdminInput
                                key='radio_station'
                                text='radio_station'
                                value={radioProgram?.radio_station.name}
                                is_disable={true}
                            />
                            <AdminInput
                                key='email'
                                text='email'
                                value={radioProgram?.email}
                                is_disable={true}
                            />
                        </div>
                        <div>
                            <div className="row m-auto w-80 mt-4 align-items-center">
                                <p className='col-3 font-30'>Corners</p>
                                <div className='col-5'>
                                    <a href={`/admin/radio_program/${radioProgram?.id}/corner/create`} className='col-2 text-center py-2 px-5 rounded-0 list-btn bg-accent'>追加</a>
                                </div>
                            </div>
                            <div className="m-auto w-80">
                                {
                                    programCorners.map(programCorner => {
                                        return (
                                            <Corners
                                                key={programCorner.id}
                                                id={programCorner.id}
                                                radio_program_id={radioProgram?.id}
                                                name={programCorner.name}
                                                click_action={() => delete_corner(programCorner.id)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <AdminButton
                            text='ラジオ番組一覧'
                            type='get'
                            click_action={click_handler}
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
