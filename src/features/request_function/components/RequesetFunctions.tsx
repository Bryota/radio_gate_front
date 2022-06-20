import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { Pagination } from '../../../components/Pagination';
import { RequestFunctionList } from './RequestFunctionList';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type RequestFunctionsType = {
    id: number
    name: string
    detail: string
    point: number
    is_voted: boolean
}

export const RequestFunctions = () => {
    const [requestFunctions, setRequestFunctions] = useState<RequestFunctionsType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchRequestFunctions = async () => {
            try {
                const RequestFunctionResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions?page=${currentPage}`);
                setRequestFunctions(RequestFunctionResponse.data.request_functions);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunctions();
    }, [currentPage]);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const prevPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page - 1);
    }

    const nextPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Request Functions"
                    subtitle='機能リクエスト一覧'
                />
                <Button
                    text='機能リクエストを追加'
                    type='get'
                    line_left={true}
                    click_action={() => {
                        navigation('/request_function/request')
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
                                    is_voted={requestFunction.is_voted}
                                />
                            )
                        })
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    prev_action={prevPagination}
                    next_action={nextPagination}
                />
            </MainLayout>
        </>
    )
}
