import axios from '../../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

import { RadioProgramType, RadioProgramUrlParamsType } from "../../../../types/admin";

export const AdminCreateCorner = () => {
    const urlParams = useParams<RadioProgramUrlParamsType>();
    const [radioProgram, setRadioProgram] = useState<RadioProgramType>();
    const [name, setName] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-programs/${urlParams.radio_program_id}`);
                setRadioProgram(RadioProgramResponse.data.radio_program);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

    const click_handler = async () => {
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/program-corners`, {
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
                            text='name'
                            change_action={e => setName(e.target.value)}
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
