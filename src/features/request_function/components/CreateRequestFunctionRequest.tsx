import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type validatedArrayType = {
    key: string,
    message: string
}

export const CreateRequestFunctionRequest = () => {
    const [name, setName] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
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

    const click_handler = async () => {
        if (validation()) {
            return;
        }
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request_function_requests`, {
            name,
            detail
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                alert('機能リクエストを申請しました');
                navigation('/request_functions');
            } else {
                console.log(res.data.message);
            }
        });
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
                        change_action={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Textarea
                        key='detail'
                        text='詳細'
                        change_action={e => setDetail(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'detail')}
                    />
                </InnerBox>
                <Button
                    text='申請する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
