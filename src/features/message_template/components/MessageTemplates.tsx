import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Pagination } from '../../../components/Pagination';
import { MessageTemplateList } from './MessageTemplateList';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type MessageTemplatesType = {
    id: number
    name: string
    content: string
}

export const MessageTemplates = () => {
    const [messageTemplates, setMessageTemplates] = useState<MessageTemplatesType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchMessageTemplates = async () => {
            try {
                const MessageTemplatesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates`);
                setMessageTemplates(MessageTemplatesResponse.data.message_templates);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessageTemplates();
    }, []);

    const click_handler = () => {
        navigation('/message_template/create')
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Templates"
                    subtitle='メッセージテンプレート一覧'
                />
                <Button
                    text='テンプレートを追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    {
                        messageTemplates.map(messageTemplate => {
                            return (
                                <MessageTemplateList
                                    key={messageTemplate.id}
                                    id={messageTemplate.id}
                                    name={messageTemplate.name}
                                />
                            )
                        })
                    }
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
