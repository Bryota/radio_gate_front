import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { usePostApi } from '../../../hooks/usePostApi';

import { validatedArrayType } from '../../../types/common';

import '../../../assets/css/elements/radio.css';

export const CreateMessageTemplate = () => {
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const { response, postApi: CreateMessageTemplate } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates`, { name, content });
    const navigation = useNavigate();

    useEffect(() => {
        if (response.status === 201) {
            navigation('/message_templates', { state: { flash_message: '新しいメッセージテンプレートを作成しました' } })
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

    const createMessageTemplate = async () => {
        if (validation()) {
            return;
        }
        CreateMessageTemplate();
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
                        changeAction={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Textarea
                        key='content'
                        text='本文'
                        changeAction={e => setContent(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'content')}
                    />
                </InnerBox>
                <Button
                    text='作成する'
                    type='post'
                    clickAction={createMessageTemplate}
                />
            </MainLayout>
        </>
    )
}
