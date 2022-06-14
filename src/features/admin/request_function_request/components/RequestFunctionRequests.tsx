import axios from '../../../../settings/Axios';
import { useState, useEffect } from 'react';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminRequestFunctionRequestList } from './RequestFunctionRequestList';

type RequestFunctionRequestType = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export const AdminRequestFunctionRequests = () => {
    const [requestFunctionRequests, setRequestFunctionRequests] = useState<RequestFunctionRequestType[]>([]);

    useEffect(() => {
        const fetchRequestFunctionRequests = async () => {
            try {
                const RequesetFunctionRequestsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request_function_requests`);
                setRequestFunctionRequests(RequesetFunctionRequestsResponse.data.request_function_requests)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunctionRequests();
    }, []);

    const close_request_function_request = async (id: number) => {
        if (window.confirm('非公開にしますか')) {
            try {
                const RequesetFunctionRequestsResponse = await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request_function_requests/close/${id}`);
                if (RequesetFunctionRequestsResponse.status === 200) {
                    window.location.reload();
                } else {
                    alert(RequesetFunctionRequestsResponse.data.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト申請一覧"
                />
                <div>
                    {
                        requestFunctionRequests.map(requestFunctionRequest => {
                            return (
                                <AdminRequestFunctionRequestList
                                    key={requestFunctionRequest.id}
                                    id={requestFunctionRequest.id}
                                    name={requestFunctionRequest.name}
                                    post_date={requestFunctionRequest.created_at}
                                    click_action={() => close_request_function_request(requestFunctionRequest.id)}
                                />
                            )
                        })
                    }
                </div>
            </AdminMainLayout>
        </>
    )
}
