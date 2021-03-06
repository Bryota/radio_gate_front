import axios from '../../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

import { RadioProgramUrlParamsType, RadioProgramType, ProgramCornerType } from '../../../../types/admin';


export const AdminEditCorner = () => {
    const urlParams = useParams<RadioProgramUrlParamsType>();
    const [radioProgram, setRadioProgram] = useState<RadioProgramType>();
    const [programCorner, setProgramCorner] = useState<ProgramCornerType>();
    const [name, setName] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs/${urlParams.radio_program_id}`);
                setRadioProgram(RadioProgramResponse.data.radio_program);
                const ProgramCornerResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/program-corners/${urlParams.id}`);
                setProgramCorner(ProgramCornerResponse.data.program_corner);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

    const click_handler = async () => {
        await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/program-corners/${urlParams.id}`, {
            radio_program_id: radioProgram?.id,
            name,
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                navigation(`/admin/radio_program/${radioProgram?.id}`)
            } else {
                console.log(res.data.message);
            }
        });
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="番組コーナー作成"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminInput
                            key='radio_station'
                            text='radio_station'
                            value={radioProgram?.name}
                            is_first_item={true}
                            is_disable={true}
                        />
                        <AdminInput
                            key='name'
                            value={programCorner?.name}
                            text='name'
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
