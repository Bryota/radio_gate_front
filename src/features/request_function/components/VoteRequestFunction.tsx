import axios from '../../../settings/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { SelectedRequestFunction } from './SelectedRequestFunction';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
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

type validatedArrayType = {
    key: string,
    message: string
}

export const VoteRequestFunction = () => {
    const [requestFunction, setRequestFunction] = useState<RequestFunctionType>();
    const [point, setPoint] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const urlParams = useParams<UrlParamsType>();
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchRequestFunction = async () => {
            try {
                const RequestFunctionResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/${urlParams.id}`);
                if (RequestFunctionResponse.data.status === 'failed') {
                    return navigation('/not_fount');
                }
                setRequestFunction(RequestFunctionResponse.data.request_function);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunction();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

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

    const click_handler = async () => {
        if (validation()) {
            return true;
        }
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_functions/submit_point`, {
            request_function_id: requestFunction?.id,
            point: point
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                navigation('/request_functions');
            } else {
                console.log(res.data.message);
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
                    name={requestFunction?.name}
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
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
