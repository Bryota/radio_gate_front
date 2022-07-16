import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { Pagination } from '../../../components/Pagination';
import { RequestFunctionList } from './RequestFunctionList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { useFlashMessage } from '../../../hooks/useFlashMessage';

import { RequestFunctionsResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RequestFunctions = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigation = useNavigate();
    const { apiData: requestFunctions, isLoading } = useFetchApiData<RequestFunctionsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions?page=${currentPage}`, currentPage);
    const flashMessage = useFlashMessage();

    const prevPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage - 1);
    }

    const nextPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : null}
                {flashMessage ? <FlashMessage message={flashMessage} /> : null}
                <Pagehead
                    title="Request Functions"
                    subtitle='機能リクエスト一覧'
                />
                <Button
                    text='機能リクエストを申請'
                    type='get'
                    line_left={true}
                    clickAction={() => {
                        navigation('/request_function/request')
                    }}
                />
                <div>
                    {
                        requestFunctions?.request_functions.map(requestFunction => {
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
                    prevAction={prevPagination}
                    nextAction={nextPagination}
                />
            </MainLayout>
        </>
    )
}
