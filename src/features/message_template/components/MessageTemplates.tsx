import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { Pagination } from '../../../components/Pagination';
import { MessageTemplateList } from './MessageTemplateList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { MessageTemplatesResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const MessageTemplates = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
    const navigation = useNavigate();
    const { apiData: messageTemplates, isLoading } = useFetchApiData<MessageTemplatesResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates?page=${currentPage}`, currentPage);

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
                {locationParams && locationParams.hasOwnProperty('flash_message') ? <FlashMessage message={locationParams.flash_message} /> : <></>}
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
                        messageTemplates?.message_templates.data.map(messageTemplate => {
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
                    prevAction={prevPagination}
                    nextAction={nextPagination}
                />
            </MainLayout>
        </>
    )
}
