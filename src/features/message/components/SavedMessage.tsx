import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { MessageItem } from './MessageItem';
import { SelectedSavedMessage } from './SelectedSavedMessage';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { UrlParamsType } from '../../../types/common';
import { MessageResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const SavedMessage = () => {
    const urlParams = useParams<UrlParamsType>();
    const navigation = useNavigate();
    const { apiData: savedMessage, isLoading } = useFetchApiData<MessageResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages/${urlParams.id}`);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="SavedMessage"
                    subtitle='一時保存'
                />
                {
                    savedMessage?.listener_message.radio_program
                        ?
                        <SelectedSavedMessage
                            id={savedMessage?.listener_message.id}
                            name={savedMessage?.listener_message.radio_program?.name}
                        />
                        :
                        <SelectedSavedMessage
                            id={savedMessage?.listener_message.id}
                            name={savedMessage?.listener_message.listener_my_program?.name}
                        />
                }
                <div>
                    {
                        savedMessage?.listener_message.radio_program
                            ?
                            <MessageItem
                                itemName='コーナー/件名'
                                value={savedMessage?.listener_message.program_corner ? savedMessage?.listener_message.program_corner?.name : savedMessage?.listener_message.subject}
                            />
                            :
                            <MessageItem
                                itemName='コーナー/件名'
                                value={savedMessage?.listener_message.my_program_corner ? savedMessage?.listener_message.my_program_corner?.name : savedMessage?.listener_message.subject}
                            />
                    }
                    <MessageItem
                        itemName='ラジオネーム'
                        value={savedMessage?.listener_message.radioName}
                    />
                    {/* # TODO: API側も変更する */}
                    <MessageItem
                        itemName='本名・住所を記載したかどうか'
                        value={savedMessage?.listener_message.listenerInfoFlag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='電話番号を記載したかどうか'
                        value={savedMessage?.listener_message.telFlag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='本文'
                        value={savedMessage?.listener_message.content}
                    />
                </div>
                <Button
                    text='一時保存一覧'
                    type='get'
                    clickAction={() => navigation('/saved_messages')}
                />
            </MainLayout>
        </>
    )
}
