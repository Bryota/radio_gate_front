import axios from '../../../../settings/Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminInput, AdminTextarea, AdminCheckBox } from '../../../../components/Form';

export const AdminCreateRequestFunction = () => {
    const location = useLocation();
    const [requestFunctionRequestId, setRequestFunctionRequestId] = useState<{ request_function_request_id: number }>(location.state as { request_function_request_id: number })
    const [name, setName] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRequestFunction = async () => {
            try {
                const RequesetFunctionresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request_function_requests/${requestFunctionRequestId.request_function_request_id}`);
                setName(RequesetFunctionresponse.data.request_function_request.name);
                setDetail(RequesetFunctionresponse.data.request_function_request.detail);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunction();
    }, []);

    const click_handler = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request_functions`, {
                name: name,
                detail: detail,
                is_open: isOpen
            });
            if (requestFunctionRequestId) {
                close_request_function_request(requestFunctionRequestId.request_function_request_id)
            }
            navigation('/admin/request_functions')
        } catch (err) {
            console.log(err)
        }
    }

    const close_request_function_request = async (id: number) => {
        if (window.confirm('参考にした機能リクエスト申請を非公開にしますか')) {
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
    console.log(isOpen)
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト作成"
                />
                <AdminInput
                    key='name'
                    text='name'
                    value={name}
                    change_action={e => setName(e.target.value)}
                />
                <AdminTextarea
                    key='detail'
                    text='detail'
                    value={detail}
                    change_action={e => setDetail(e.target.value)}
                />
                <AdminCheckBox
                    label='is_open'
                    text='公開する'
                    checked={isOpen}
                    change_action={() => setIsOpen(!isOpen)}
                />
                <AdminButton
                    text='作成'
                    type='post'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
