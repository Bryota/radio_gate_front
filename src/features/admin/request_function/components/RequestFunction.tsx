import axios from '../../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';

import { UrlParamsType } from '../../../../types/common';
import { RequestFunctionType } from '../../../../types/admin';

export const AdminRequestFunction = () => {
    const urlParams = useParams<UrlParamsType>();
    const [requestFunction, setRequestFunction] = useState<RequestFunctionType>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRequestFunction = async () => {
            try {
                const RequesetFunctionresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request-functions/${urlParams.id}`);
                setRequestFunction(RequesetFunctionresponse.data.request_function)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunction();
    }, []);

    const click_handler = () => {
        return navigation('/admin/request_functions');
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト"
                />
                <div>
                    <p className='font-30 underline-green'>{requestFunction?.name}:{requestFunction?.is_open ? '公開中' : '非公開'}</p>
                    <p className='mt-4 font-25'>現在:{requestFunction?.point}ポイント</p>
                    <div className='mt-4'>
                        <p className='font-25 mb-2'>detail</p>
                        <div className='bg-white p-4'>
                            {requestFunction?.detail}
                        </div>
                    </div>
                </div>
                <AdminButton
                    text='一覧'
                    type='get'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
