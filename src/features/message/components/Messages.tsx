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
                        messages?.listener_message !== undefined ?
                            messages?.listener_message.data.map(message => {
                                if (message.radioProgram) {
                                    return (
                                        <MessageList
                                            id={message.id}
                                            radioProgram={message.radioProgram?.name}
                                            corner={message.programCorner ? message.programCorner?.name : message.subject}
                                            postDate={message.posted_at}
                                        />
                                    )
                                } else {
                                    return (
                                        <MessageList
                                            id={message.id}
                                            radioProgram={message.listenerMyProgram?.name}
                                            corner={message.myProgramCorner ? message.myProgramCorner?.name : message.subject}
                                            postDate={message.posted_at}
                                        />
                                    )
                                }
                            })
                            :
                            <></>
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
