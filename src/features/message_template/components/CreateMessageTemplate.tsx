import axios from '../../../settings/Axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
import '../../../assets/css/elements/radio.css';

type validatedArrayType = {
    key: string,
    message: string
}

export const CreateMessageTemplate = () => {
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
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
                    key: 'content',
                    value: content,
                    type: 'require'
                },
                {
                    key: 'content',
                    value: content,
                    type: 'max|1000'
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

    const create_handler = async () => {
        if (validation()) {
            return;
        }
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates`, {
            name,
            content
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                alert('作成しました')
            } else {
                console.log(res.data.message);
            }
        });
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Template Create"
                    subtitle='メッセージテンプレート作成'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='テンプレート名'
                        is_first_item={true}
                        change_action={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Textarea
                        key='content'
                        text='本文'
                        change_action={e => setContent(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'content')}
                    />
                </InnerBox>
                <Button
                    text='作成する'
                    type='post'
                    click_action={create_handler}
                />
            </MainLayout>
        </>
    )
}
