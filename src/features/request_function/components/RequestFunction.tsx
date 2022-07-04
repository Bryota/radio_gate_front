import { useNavigate, useParams } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
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

type RequestFunctionResponseType = {
    request_function: RequestFunctionType
    isLoading: boolean
}

export const RequestFunction = () => {
    const navigation = useNavigate();
    const urlParams = useParams<UrlParamsType>();
    const { apiData: requestFunction, isLoading } = useFetchApiData<RequestFunctionResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions/${urlParams.id}`);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Request Function"
                    subtitle='機能リクエスト'
                />
                <SelectedRequestFunction
                    name={requestFunction?.request_function.name}
                />
                <div>
                    <p className='h3 mb-4'>詳細</p>
                    <InnerBox>{requestFunction?.request_function.detail}</InnerBox>
                </div>
                <Button
                    text='投票する'
                    type='post'
                    clickAction={() => {
                        return navigation(`/request_function/${requestFunction?.request_function.id}/vote`)
                    }}
                />
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
