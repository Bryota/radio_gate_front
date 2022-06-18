import axios from '../../../settings/Axios';
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { SelectedMessageTemplate } from './SelectedMessageTemplate';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';

type UrlParamsType = {
    id: string
}

type MessageTemplateType = {
    id: number
    name: string
    content: string
}

export const MessageTemplate = () => {
    const urlParams = useParams<UrlParamsType>();
    const [messageTemplate, setMessageTemplate] = useState<MessageTemplateType>();
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchMessageTemplate = async () => {
            try {
                const MessageTemplateResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`);
                setMessageTemplate(MessageTemplateResponse.data.message_template);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessageTemplate();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const to_edit_page = () => {
        navigation(`edit`)
    }

    const delete_handler = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates/${urlParams.id}`);
            return (
                navigation('/message_templates')
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Template"
                    subtitle='メッセージテンプレート'
                />
                <SelectedMessageTemplate
                    name={messageTemplate?.name}
                />
                <div>
                    <p className='h3 mb-4'>本文</p>
                    <InnerBox>{messageTemplate?.content}</InnerBox>
                </div>
                <Button
                    text='編集する'
                    type='post'
                    click_action={to_edit_page}
                />
                <Button
                    text='削除する'
                    type='delete'
                    click_action={delete_handler}
                />
            </MainLayout>
        </>
    )
}
