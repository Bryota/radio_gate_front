import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { MessageList } from './MessageList';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchMessages = async () => {
            try {
                const MessagesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages?page=${currentPage}`);
                setMessages(MessagesResponse.data.listener_messages.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessages();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const prevPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page - 1);
    }

    const nextPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page + 1);
    }

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
                <Pagination
                    currentPage={currentPage}
                    prev_action={prevPagination}
                    next_action={nextPagination}
                />
            </MainLayout>
        </>
    )
}
