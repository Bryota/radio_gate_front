import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const CreateRequestFunctionRequest = () => {
    const [name, setName] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const click_handler = async () => {
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_function_requests`, {
            name,
            detail
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                alert('機能リクエストを申請しました');
                navigation('/request_functions');
            } else {
                console.log(res.data.message);
            }
        });
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Function Create"
                    subtitle='機能リクエスト申請'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='タイトル'
                        change_action={e => setName(e.target.value)}
                    />
                    <Textarea
                        key='detail'
                        text='詳細'
                        change_action={e => setDetail(e.target.value)}
                    />
                </InnerBox>
                <Button
                    text='申請する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
