import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { MessageItem } from './MessageItem';
import { SelectedSavedMessage } from './SelectedSavedMessage';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';

type UrlParamsType = {
    id: string
}

type SavedMessageType = {
    id: number
    radio_program_id: string
    program_corner_id: string
    listener_my_program_id: string
    my_program_corner_id: string
    subject?: string
    content: string
    radio_name?: string
    listener_info_flag: boolean
    tel_flag: boolean
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

export const SavedMessage = () => {
    const urlParams = useParams<UrlParamsType>();
    const [savedMessage, setSavedMessage] = useState<SavedMessageType>();
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchMessage = async () => {
            try {
                const SavedMessageResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages/${urlParams.id}`);
                setSavedMessage(SavedMessageResponse.data.listener_message);
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
            navigation('/saved_messages')
        )
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="SavedMessage"
                    subtitle='一時保存'
                />
                {
                    savedMessage?.radio_program
                        ?
                        <SelectedSavedMessage
                            id={savedMessage?.id}
                            name={savedMessage?.radio_program?.name}
                        />
                        :
                        <SelectedSavedMessage
                            id={savedMessage?.id}
                            name={savedMessage?.listener_my_program?.name}
                        />
                }
                <div>
                    {
                        savedMessage?.radio_program
                            ?
                            <MessageItem
                                item_name='コーナー/件名'
                                value={savedMessage?.program_corner ? savedMessage?.program_corner?.name : savedMessage?.subject}
                            />
                            :
                            <MessageItem
                                item_name='コーナー/件名'
                                value={savedMessage?.my_program_corner ? savedMessage?.my_program_corner?.name : savedMessage?.subject}
                            />
                    }
                    <MessageItem
                        item_name='ラジオネーム'
                        value={savedMessage?.radio_name}
                    />
                    {/* # TODO: API側も変更する */}
                    <MessageItem
                        item_name='本名・住所を記載したかどうか'
                        value={savedMessage?.listener_info_flag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        item_name='電話番号を記載したかどうか'
                        value={savedMessage?.tel_flag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        item_name='本文'
                        value={savedMessage?.content}
                    />
                </div>
                <Button
                    text='一時保存一覧'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
