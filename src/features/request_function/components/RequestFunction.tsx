import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { UrlParamsType } from '../../../types/common';
import { RequestFunctionResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const RequestFunction = () => {
    const navigation = useNavigate();
    const urlParams = useParams<UrlParamsType>();
    const { apiData: requestFunction, isLoading, fetchApiData: fetchRequestFunction } = useFetchApiData<RequestFunctionResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions/${urlParams.id}`);

    useEffect(() => {
        fetchRequestFunction();
    }, []);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
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
                {
                    requestFunction?.is_voted ?
                        <Button
                            text='投票済み'
                            type='post'
                            disable={true}
                            clickAction={() => {
                                return navigation(`/request_function/${requestFunction?.id}/vote`)
                            }}
                        />
                        :
                        <Button
                            text='投票する'
                            type='post'
                            clickAction={() => {
                                return navigation(`/request_function/${requestFunction?.id}/vote`)
                            }}
                        />
                }
                <Button
                    text='機能リクエスト一覧'
                    type='get'
                    clickAction={() => {
                        return navigation(`/request_functions`)
                    }}
                />
            </MainLayout>
        </>
    )
}
