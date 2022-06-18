import axios from '../../../settings/Axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { isAuthorized } from '../../../modules/auth/isAuthorized';

export const MessagePostComplete = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const [radioProgram, setRadioProgram] = useState<{ radio_program_id: string, is_my_radio_program: boolean }>(location.state as { radio_program_id: string, is_my_radio_program: boolean })
    const [radioProgramName, setRadioProgramName] = useState<string>();
    useEffect(() => {
        authorized();
        const fetchRadioProgramName = async () => {
            try {
                if (radioProgram.is_my_radio_program) {
                    const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${radioProgram.radio_program_id}`);
                    setRadioProgramName(RadioProgramResponse.data.listener_my_program.name);
                } else {
                    const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs/${radioProgram.radio_program_id}`);
                    setRadioProgramName(RadioProgramResponse.data.radio_program.name);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgramName();
    }, []);
    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Complete"
                    subtitle='メッセージ投稿完了'
                />
                <div className='text-center mt-5 mb-4'>
                    <p className='h4'>{`${radioProgramName}へのメッセージが投稿されました。`}</p>
                    <p className='h4'>採用されることを願っています！</p>
                </div>
                <Button
                    text='投稿一覧'
                    type='get'
                    click_action={() => {
                        return navigation('/messages')
                    }}
                />
            </MainLayout>
        </>
    )
}
