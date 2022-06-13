import axios from '../../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRequestFunctionList } from './RequestFunctionList';

type RequestFunctionType = {
    id: number
    name: string
    detail: string
    point: number
    created_at: string
    updated_at: string
}

export const AdminRequestFunctions = () => {
    const [requestFunctions, setRequestFunctions] = useState<RequestFunctionType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRequestFunctions = async () => {
            try {
                const RequesetFunctionsresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request_functions`);
                setRequestFunctions(RequesetFunctionsresponse.data.request_functions)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunctions();
    }, []);

    const click_handler = () => {
        return navigation('/admin/request_function/create')
    }

    const delete_request_function = async (id: number) => {
        // try {
        //     const RequestFunctionresponse = await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request_functions/${id}`);
        //     if (RequestFunctionresponse.status === 200) {
        //         window.location.reload();
        //     } else {
        //         alert(RequestFunctionresponse.data.message);
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト一覧"
                />
                <AdminButton
                    text='追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    {
                        requestFunctions.map(requestFunction => {
                            return (
                                <AdminRequestFunctionList
                                    key={requestFunction.id}
                                    id={requestFunction.id}
                                    name={requestFunction.name}
                                    post_date={requestFunction.created_at}
                                    click_action={() => delete_request_function(requestFunction.id)}
                                />
                            )
                        })
                    }
                </div>
            </AdminMainLayout>
        </>
    )
}
