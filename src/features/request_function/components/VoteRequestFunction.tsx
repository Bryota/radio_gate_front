import axios from '../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { usePostApi } from '../../../hooks/usePostApi';

import { UrlParamsType, validatedArrayType } from '../../../types/common';
import { RequestFunctionResponseType } from '../../../types/listener';

export const VoteRequestFunction = () => {
    const [point, setPoint] = useState<string>('');
    const urlParams = useParams<UrlParamsType>();
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();
    const { apiData: requestFunction, isLoading, fetchApiData: fetchRequestFunction } = useFetchApiData<RequestFunctionResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions/${urlParams.id}`);
    const { response, postApi: UpdateRequestFunctionPoint } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions/${requestFunction?.id}/point`, { point });

    useEffect(() => {
        if (response.status === 201) {
            navigation('/request_functions', { state: { flash_message: '機能リクエストに投票しました' } })
        }
        fetchRequestFunction();
    }, [response])

    const validation = () => {
        const result = validationCheck(
            [
                {
                    key: 'point',
                    value: point,
                    type: 'require'
                },
            ]
        )
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const voteRequestFunction = async () => {
        if (validation()) {
            return;
        }
        UpdateRequestFunctionPoint();
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Request Function Vote"
                    subtitle='機能リクエスト投票'
                />
                <SelectedRequestFunction
                    name={requestFunction?.name}
                />
                <InnerBox>
                    <div className='row form-input_item'>
                        <div className='col-4'>
                            <label htmlFor='point'>ポイント</label>
                        </div>
                        <div className='col-8 position-relative'>
                            <select id='point' className='position-absolute w-100 border-0 underline-green' defaultValue={point} data-testid='request-function-vote' onChange={e => setPoint(e.target.value)} >
                                <option hidden>選択してください</option>
                                <option value='1'>1</option>
                                <option value='3'>3</option>
                                <option value='5'>5</option>
                                <option value='7'>7</option>
                            </select>
                        </div>
                        {
                            validationMessages.map(validationMessage => {
                                return (
                                    <p className='mt-2 color-accent'>{validationMessage.message}</p>
                                )
                            })
                        }
                    </div>
                </InnerBox>
                <Button
                    text='投票する'
                    type='post'
                    clickAction={voteRequestFunction}
                />
            </MainLayout>
        </>
    )
}
