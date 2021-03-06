import axios from '../../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';

import { UrlParamsType } from '../../../../types/common';
import { RequestFunctionRequestType } from '../../../../types/admin';

export const AdminRequestFunctionRequest = () => {
    const urlParams = useParams<UrlParamsType>();
    const [requestFunctionRequest, setRequestFunctionRequest] = useState<RequestFunctionRequestType>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRequestFunctionRequest = async () => {
            try {
                const RequesetFunctionRequestresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request-function-requests/${urlParams.id}`);
                setRequestFunctionRequest(RequesetFunctionRequestresponse.data.request_function_request)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunctionRequest();
    }, []);

    const click_handler = () => {
        return navigation('/admin/request_function_requests');
    }


    const to_create_request_function = () => {
        return navigation('/admin/request_function/create', { state: { request_function_request_id: urlParams.id } });
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト申請"
                />
                <div>
                    <p className='font-30 underline-green'>{requestFunctionRequest?.name}</p>
                    <div className='mt-4'>
                        <p className='font-25 mb-2'>detail</p>
                        <div className='bg-white p-4'>
                            {requestFunctionRequest?.detail}
                        </div>
                    </div>
                </div>
                <AdminButton
                    text='一覧'
                    type='get'
                    click_action={click_handler}
                />
                <AdminButton
                    text='機能リクエスト作成'
                    type='post'
                    click_action={to_create_request_function}
                />
            </AdminMainLayout>
        </>
    )
}
