import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading, FlashMessage } from '../../../components/Elements';
import { SavedMessageList } from './SavedMessageList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { useFlashMessage } from '../../../hooks/useFlashMessage';

import { MessagesResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const SavedMessages = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: savedMessages, isLoading } = useFetchApiData<MessagesResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/saved-messages?page=${currentPage}`);
    const flashMessage = useFlashMessage();

    const prevPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage - 1);
    }

    const nextPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : null}
                {flashMessage ? <FlashMessage message={flashMessage} /> : null}
                <Pagehead
                    title="SavedMessages"
                    subtitle='一時保存一覧'
                />
                <div>
                    {
                        savedMessages?.listener_messages.data.map(message => {
                            if (message.radio_program) {
                                return (
                                    <SavedMessageList
                                        id={message.id}
                                        radioProgram={message.radio_program?.name}
                                        corner={message.program_corner ? message.program_corner?.name : message.subject}
                                    />
                                )
                            } else {
                                return (
                                    <SavedMessageList
                                        id={message.id}
                                        radioProgram={message.listener_my_program?.name}
                                        corner={message.my_program_corner ? message.my_program_corner?.name : message.subject}
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
