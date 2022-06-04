import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { MessageList } from './MessageList';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type MessagesType = {
    id: number
    radio_program_id: string
    program_corner_id: string
    listener_my_program_id: string
    my_program_corner_id: string
    subject?: string
    content: string
    radio_name?: string
    posted_at: string
    created_at: string
    updated_at: string
    listener_my_program?: {
        name?: string
    }
    my_program_corner?: {
        name?: string
    }
    radio_program?: {
        name?: string
    }
    program_corner?: {
        name?: string
    }
}

export const Messages = () => {
    const [messages, setMessages] = useState<MessagesType[]>([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const MessagesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages`);
                setMessages(MessagesResponse.data.listener_messages);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessages();
    }, []);

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Messages"
                    subtitle='投稿一覧'
                />
                <div>
                    {
                        messages.map(message => {
                            if (message.radio_program) {
                                return (
                                    <MessageList
                                        id={message.id}
                                        radio_program={message.radio_program?.name}
                                        corner={message.program_corner ? message.program_corner?.name : message.subject}
                                        post_date={message.posted_at}
                                    />
                                )
                            } else {
                                return (
                                    <MessageList
                                        id={message.id}
                                        radio_program={message.listener_my_program?.name}
                                        corner={message.my_program_corner ? message.my_program_corner?.name : message.subject}
                                        post_date={message.posted_at}
                                    />
                                )
                            }
                        })
                    }
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
