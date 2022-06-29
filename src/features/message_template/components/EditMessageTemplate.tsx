import axios from '../../../settings/Axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { Input, Textarea } from '../../../components/Form';
import { validationCheck } from '../../../modules/validation/validationCheck';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import '../../../assets/css/elements/radio.css';

type UrlParamsType = {
    id: string
}

type MessageTemplateType = {
    id: number
    name: string
    content: string
}

type validatedArrayType = {
    key: string,
    message: string
}

type MessageTemplateResponseType = {
    message_template: MessageTemplateType
    isLoading: boolean
}

export const EditMessageTemplate = () => {
    const urlParams = useParams<UrlParamsType>();
    const [name, setName] = useState<string | undefined>('');
    const [content, setContent] = useState<string | undefined>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();
    const { apiData: messageTemplate, isLoading } = useFetchApiData<MessageTemplateResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`);

    useEffect(() => {
        setName(messageTemplate?.message_template.name);
        setContent(messageTemplate?.message_template.content);
    }, []);

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

    const updateMessageTemplate = async () => {
        if (validation()) {
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`, {
                name,
                content
            });
            navigation(`message_template/${urlParams.id}`, { state: { flash_message: 'メッセージテンプレートを更新しました' } })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Message Template Edit"
                    subtitle='メッセージテンプレート更新'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='テンプレート名'
                        value={name}
                        is_first_item={true}
                        changeAction={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Textarea
                        key='content'
                        text='本文'
                        value={content}
                        changeAction={e => setContent(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'content')}
                    />
                </InnerBox>
                <Button
                    text='更新する'
                    type='post'
                    clickAction={updateMessageTemplate}
                />
            </MainLayout>
        </>
    )
}
