import axios from '../../../settings/Axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';
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

export const EditMessageTemplate = () => {
    const urlParams = useParams<UrlParamsType>();
    const [messageTemplate, setMessageTemplate] = useState<MessageTemplateType>();
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchRadioProgram = async () => {
            try {
                const MessageTemplateResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`);
                setName(MessageTemplateResponse.data.message_template.name);
                setContent(MessageTemplateResponse.data.message_template.content);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
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

    const update_handler = async () => {
        if (validation()) {
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`, {
                name,
                content
            });
            alert('更新しました');
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
                        change_action={e => setName(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'name')}
                    />
                    <Textarea
                        key='content'
                        text='本文'
                        value={content}
                        change_action={e => setContent(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'content')}
                    />
                </InnerBox>
                <Button
                    text='更新する'
                    type='post'
                    click_action={update_handler}
                />
            </MainLayout>
        </>
    )
}
