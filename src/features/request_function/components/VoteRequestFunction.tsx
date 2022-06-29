import axios from '../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

type UrlParamsType = {
    id: string
}

type RequestFunctionType = {
    id: number
    name: string
    detail: string
    point: number
}

type validatedArrayType = {
    key: string,
    message: string
}

type RequestFunctionResponseType = {
    request_function: RequestFunctionType
    isLoading: boolean
}

export const VoteRequestFunction = () => {
    const [point, setPoint] = useState<string>('');
    const urlParams = useParams<UrlParamsType>();
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();
    const { apiData: requestFunction, isLoading } = useFetchApiData<RequestFunctionResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/${urlParams.id}`);

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
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/submit_point`, {
            request_function_id: requestFunction?.request_function.id,
            point: point
        }).then(res => {
            if (res.status === 201) {
                navigation('/request_functions', { state: { flash_message: '機能リクエストに投票しました' } })
            } else {
                navigation('/request_functions', { state: { flash_message: '機能リクエストの投票に失敗しました' } })
            }
        });
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
                    name={requestFunction?.request_function.name}
                />
                <InnerBox>
                    <div className='row form-input_item'>
                        <div className='col-4'>
                            <label htmlFor='point'>ポイント</label>
                        </div>
                        <div className='col-8 position-relative'>
                            <select id='point' className='position-absolute w-100 border-0 underline-green' defaultValue={point} onChange={e => setPoint(e.target.value)} >
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
