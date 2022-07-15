import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { MessageList } from './MessageList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { MessagesResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const Messages = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: messages, isLoading } = useFetchApiData<MessagesResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages?page=${currentPage}`);

    const prevPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage - 1);
    }

    const nextPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Messages"
                    subtitle='投稿一覧'
                />
                <div>
                    {
                        messages?.listener_messages.data.map(message => {
                            if (message.radio_program) {
                                return (
                                    <MessageList
                                        id={message.id}
                                        radioProgram={message.radio_program?.name}
                                        corner={message.program_corner ? message.program_corner?.name : message.subject}
                                        postDate={message.posted_at}
                                    />
                                )
                            } else {
                                return (
                                    <MessageList
                                        id={message.id}
                                        radioProgram={message.listener_my_program?.name}
                                        corner={message.my_program_corner ? message.my_program_corner?.name : message.subject}
                                        postDate={message.posted_at}
                                    />
                                )
                            }
                        })
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    prevAction={prevPagination}
                    nextAction={nextPagination}
                />
            </MainLayout>
        </>
    )
}
