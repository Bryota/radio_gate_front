import axios from '../../../settings/Axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';

export const MessagePostComplete = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const [radioProgramId, setRadioProgramId] = useState<{ radio_program_id: string }>(location.state as { radio_program_id: string })
    const [radioProgramName, setRadioProgramName] = useState<string>();
    useEffect(() => {
        const fetchRadioProgramName = async () => {
            try {
                const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs/${radioProgramId.radio_program_id}`);
                setRadioProgramName(RadioProgramResponse.data.radio_program.name);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgramName();
    }, []);
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
