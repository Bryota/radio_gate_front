import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import '../../../assets/css/elements/radio.css';

type UrlParamsType = {
    id: string
}

type MessageTemplateType = {
    id: number
    name: string
    content: string
}

export const EditMessageTemplate = () => {
    const urlParams = useParams<UrlParamsType>();
    const [messageTemplate, setMessageTemplate] = useState<MessageTemplateType>();
    const [name, setName] = useState<string>();
    const [content, setContent] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const MessageTemplateResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`);
                setMessageTemplate(MessageTemplateResponse.data.message_template);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }, []);

    const update_handler = async () => {
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
                <Pagehead
                    title="Message Template Edit"
                    subtitle='メッセージテンプレート更新'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='テンプレート名'
                        value={messageTemplate?.name}
                        is_first_item={true}
                        change_action={e => setName(e.target.value)}
                    />
                    <Textarea
                        key='body'
                        text='本文'
                        value={messageTemplate?.content}
                        change_action={e => setContent(e.target.value)}
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
