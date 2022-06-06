import axios from '../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
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

export const RequestFunction = () => {
    const [requestFunction, setRequestFunction] = useState<RequestFunctionType>();
    const navigation = useNavigate();
    const urlParams = useParams<UrlParamsType>();

    useEffect(() => {
        const fetchRequestFunction = async () => {
            try {
                const RequestFunctionResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/${urlParams.id}`);
                setRequestFunction(RequestFunctionResponse.data.request_function);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunction();
    }, []);

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Function"
                    subtitle='機能リクエスト'
                />
                <SelectedRequestFunction
                    name={requestFunction?.name}
                />
                <div>
                    <p className='h3 mb-4'>詳細</p>
                    <InnerBox>{requestFunction?.detail}</InnerBox>
                </div>
                <Button
                    text='投票する'
                    type='post'
                    click_action={() => {
                        return navigation(`/request_function/${requestFunction?.id}/vote`)
                    }}
                />
                <Button
                    text='機能リクエスト一覧'
                    type='get'
                    click_action={() => {
                        return navigation(`/request_functions`)
                    }}
                />
            </MainLayout>
        </>
    )
}
