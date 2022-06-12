import axios from '../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Select } from '../../../components/Form';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import '../../../assets/css/elements/radio.css';

type UrlParamsType = {
    id: string
}

type RequestFunctionType = {
    id: number
    name: string
    detail: string
    point: number
}

export const VoteRequestFunction = () => {
    const [requestFunction, setRequestFunction] = useState<RequestFunctionType>();
    const [point, setPoint] = useState<string>();
    const navigation = useNavigate();
    const urlParams = useParams<UrlParamsType>();

    useEffect(() => {
        const fetchRequestFunction = async () => {
            try {
                const RequestFunctionResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/${urlParams.id}`);
                if (RequestFunctionResponse.data.status === 'failed') {
                    return navigation('/not_fount');
                }
                setRequestFunction(RequestFunctionResponse.data.request_function);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunction();
    }, []);

    const click_handler = async () => {
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/submit_point`, {
            request_function_id: requestFunction?.id,
            point: point
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
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
                    title="Request Function Vote"
                    subtitle='機能リクエスト投票'
                />
                <SelectedRequestFunction
                    name={requestFunction?.name}
                />
                <InnerBox>
                    <div className='row form-input_item'>
                        <div className='col-4'>
                            <label htmlFor='point'>ポイント</label>
                        </div>
                        <div className='col-8 position-relative'>
                            <select id='point' className='position-absolute w-100 border-0 underline-green' defaultValue={point} onChange={e => setPoint(e.target.value)} >
                                <option hidden>選択してください</option>
                                <option value='1'>1</option>
                                <option value='3'>3</option>
                                <option value='5'>5</option>
                                <option value='7'>7</option>
                            </select>
                        </div>
                    </div>
                </InnerBox>
                <Button
                    text='投票する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
