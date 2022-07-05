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

export const Message = () => {
    const urlParams = useParams<UrlParamsType>();
    const navigation = useNavigate();
    const { apiData: message, isLoading } = useFetchApiData<MessageResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages/${urlParams.id}`);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Message"
                    subtitle='投稿'
                />
                {
                    message?.listener_message.radioProgram
                        ?
                        <SelectedMessage
                            name={message?.listener_message.radioProgram?.name}
                            postDate={message?.listener_message.posted_at}
                        />
                        :
                        <SelectedMessage
                            name={message?.listener_message.listenerMyProgram?.name}
                            postDate={message?.listener_message.posted_at}
                        />
                }
                <div>
                    {
                        message?.listener_message.radioProgram
                            ?
                            <MessageItem
                                itemName='コーナー/件名'
                                value={message?.listener_message.programCorner ? message?.listener_message.programCorner?.name : message?.listener_message.subject}
                            />
                            :
                            <MessageItem
                                itemName='コーナー/件名'
                                value={message?.listener_message.myProgramCorner ? message?.listener_message.myProgramCorner?.name : message?.listener_message.subject}
                            />
                    }
                    <MessageItem
                        itemName='ラジオネーム'
                        value={message?.listener_message.radioName}
                    />
                    <MessageItem
                        itemName='本名・住所を記載したかどうか'
                        value={message?.listener_message.listenerInfoFlag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='電話番号を記載したかどうか'
                        value={message?.listener_message.telFlag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='本文'
                        value={message?.listener_message.content}
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
