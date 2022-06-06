import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Pagination } from '../../../components/Pagination';
import { RequestFunctionList } from './RequestFunctionList';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type RequestFunctionsType = {
    id: number
    name: string
    detail: string
    point: number
}

export const RequestFunctions = () => {
    const [requestFunctions, setRequestFunctions] = useState<RequestFunctionsType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRequestFunctions = async () => {
            try {
                const RequestFunctionResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions`);
                setRequestFunctions(RequestFunctionResponse.data.request_functions);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunctions();
    }, []);

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Functions"
                    subtitle='機能リクエスト一覧'
                />
                <Button
                    text='機能リクエストを追加'
                    type='get'
                    line_left={true}
                    click_action={() => {
                        navigation('/request_function/create')
                    }}
                />
                <div>
                    {
                        requestFunctions.map(requestFunction => {
                            return (
                                <RequestFunctionList
                                    key={requestFunction.id}
                                    id={requestFunction.id}
                                    name={requestFunction.name}
                                    point={requestFunction.point}
                                />
                            )
                        })
                    }
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
