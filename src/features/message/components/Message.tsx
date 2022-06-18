import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { MessageItem } from './MessageItem';
import { SelectedMessage } from './SelectedMessage';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';

type UrlParamsType = {
    id: string
}

type MessageType = {
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

export const Message = () => {
    const urlParams = useParams<UrlParamsType>();
    const [message, setMessage] = useState<MessageType>();
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchMessage = async () => {
            try {
                const MessageResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages/${urlParams.id}`);
                setMessage(MessageResponse.data.listener_message);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessage();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const click_handler = () => {
        return (
            navigation('/messages')
        )
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message"
                    subtitle='投稿'
                />
                {
                    message?.radio_program
                        ?
                        <SelectedMessage
                            name={message?.radio_program?.name}
                            post_date={message?.posted_at}
                        />
                        :
                        <SelectedMessage
                            name={message?.listener_my_program?.name}
                            post_date={message?.posted_at}
                        />
                }
                <div>
                    {
                        message?.radio_program
                            ?
                            <MessageItem
                                item_name='コーナー/件名'
                                value={message?.program_corner ? message?.program_corner?.name : message?.subject}
                            />
                            :
                            <MessageItem
                                item_name='コーナー/件名'
                                value={message?.my_program_corner ? message?.my_program_corner?.name : message?.subject}
                            />
                    }
                    <MessageItem
                        item_name='ラジオネーム'
                        value={message?.radio_name}
                    />
                    {/* # TODO: API側も変更する */}
                    <MessageItem
                        item_name='本名・住所を記載したかどうか'
                        value='いいえ'
                    />
                    <MessageItem
                        item_name='電話番号を記載したかどうか'
                        value='はい'
                    />
                    <MessageItem
                        item_name='本文'
                        value={message?.content}
                    />
                </div>
                <Button
                    text='投稿一覧'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
