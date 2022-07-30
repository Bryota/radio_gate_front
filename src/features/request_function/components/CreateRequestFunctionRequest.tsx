import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { usePostApi } from '../../../hooks/usePostApi';

import { validatedArrayType } from '../../../types/common';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const CreateRequestFunctionRequest = () => {
    const [name, setName] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const { response, postApi: CreateRequestFunctionRequest } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-function-requests`, { name, detail });
    const navigation = useNavigate();

    useEffect(() => {
        if (response.status === 201) {
            navigation('/request_functions', { state: { flash_message: '機能リクエストを申請しました' } })
        }
        authorized();
    }, [response]);

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
                    key: 'name',
                    value: name,
                    type: 'require'
                },
                {
                    key: 'name',
                    value: name,
                    type: 'max|150'
                },
                {
                    key: 'detail',
                    value: detail,
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

    const postRequestFunctionRequest = async () => {
        if (validation()) {
            return;
        }
        CreateRequestFunctionRequest();
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Function Create"
                    subtitle='機能リクエスト申請'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='タイトル'
                        changeAction={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                        data_testid='request-function-request-input-name'
                    />
                    <Textarea
                        key='detail'
                        text='詳細'
                        changeAction={e => setDetail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'detail')}
                        data_testid='request-function-request-input-detail'
                    />
                </InnerBox>
                <Button
                    text='申請する'
                    type='post'
                    clickAction={postRequestFunctionRequest}
                />
            </MainLayout>
        </>
    )
}
