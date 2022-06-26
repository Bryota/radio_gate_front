import axios from '../../../settings/Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { Pagination } from '../../../components/Pagination';
import { MessageTemplateList } from './MessageTemplateList';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type MessageTemplatesType = {
    id: number
    name: string
    content: string
}

export const MessageTemplates = () => {
    const location = useLocation();
    const [messageTemplates, setMessageTemplates] = useState<MessageTemplatesType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchMessageTemplates = async () => {
            try {
                const MessageTemplatesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates?page=${currentPage}`);
                setMessageTemplates(MessageTemplatesResponse.data.message_templates.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessageTemplates();
    }, [currentPage]);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const click_handler = () => {
        navigation('/message_template/create')
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
                <Pagination
                    currentPage={currentPage}
                    prev_action={prevPagination}
                    next_action={nextPagination}
                />
            </MainLayout>
        </>
    )
}
