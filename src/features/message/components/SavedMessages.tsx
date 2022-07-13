import { useLocation, useNavigate } from 'react-router-dom';
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
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
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
                        savedMessages?.listener_message.data.map(message => {
                            if (message.radioProgram) {
                                return (
                                    <SavedMessageList
                                        id={message.id}
                                        radioProgram={message.radioProgram?.name}
                                        corner={message.programCorner ? message.programCorner?.name : message.subject}
                                    />
                                )
                            } else {
                                return (
                                    <SavedMessageList
                                        id={message.id}
                                        radioProgram={message.listenerMyProgram?.name}
                                        corner={message.myProgramCorner ? message.myProgramCorner?.name : message.subject}
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
