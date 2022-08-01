import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { Pagination } from '../../../components/Pagination';
import { MessageTemplateList } from './MessageTemplateList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { useFlashMessage } from '../../../hooks/useFlashMessage';

import { MessageTemplatesResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const MessageTemplates = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigation = useNavigate();
    const { apiData: messageTemplates, isLoading, fetchApiData: fetchMessageTemplates } = useFetchApiData<MessageTemplatesResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates?page=${currentPage}`, currentPage);
    const flashMessage = useFlashMessage();

    useEffect(() => {
        fetchMessageTemplates();
    }, []);

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
                    title="Message Templates"
                    subtitle='メッセージテンプレート一覧'
                />
                <Button
                    text='テンプレートを追加'
                    type='post'
                    line_left={true}
                    clickAction={() => navigation('/message_template/create')}
                />
                <div>
                    {
                        messageTemplates?.data.map(messageTemplate => {
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
                <Pagination
                    currentPage={currentPage}
                    lastPage={messageTemplates?.last_page}
                    prevAction={prevPagination}
                    nextAction={nextPagination}
                />
            </MainLayout>
        </>
    )
}
