import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { MessageItem } from './MessageItem';
import { SelectedMessage } from './SelectedMessage';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { UrlParamsType } from '../../../types/common';
import { MessageResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import { useEffect } from 'react';

export const Message = () => {
    const urlParams = useParams<UrlParamsType>();
    const navigation = useNavigate();
    const { apiData: message, isLoading, fetchApiData: fetchMessage } = useFetchApiData<MessageResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages/${urlParams.id}`);

    useEffect(() => {
        fetchMessage();
    }, [])

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Message"
                    subtitle='投稿'
                />
                {
                    message?.radio_program
                        ?
                        <SelectedMessage
                            name={message?.radio_program?.name}
                            postDate={message?.posted_at}
                        />
                        :
                        <SelectedMessage
                            name={message?.listener_my_program?.name}
                            postDate={message?.posted_at}
                        />
                }
                <div>
                    {
                        message?.radio_program
                            ?
                            <MessageItem
                                itemName='コーナー/件名'
                                value={message?.program_corner ? message?.program_corner?.name : message?.subject}
                            />
                            :
                            <MessageItem
                                itemName='コーナー/件名'
                                value={message?.my_program_corner ? message?.my_program_corner?.name : message?.subject}
                            />
                    }
                    <MessageItem
                        itemName='ラジオネーム'
                        value={message?.radio_name}
                    />
                    <MessageItem
                        itemName='本名・住所を記載したかどうか'
                        value={message?.listener_info_flag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='電話番号を記載したかどうか'
                        value={message?.tel_flag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='本文'
                        value={message?.content}
                    />
                </div>
                <Button
                    text='投稿一覧'
                    type='get'
                    clickAction={() => navigation('/messages')}
                />
            </MainLayout>
        </>
    )
}
