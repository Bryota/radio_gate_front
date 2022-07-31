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
import { useEffect } from 'react';

export const SavedMessage = () => {
    const urlParams = useParams<UrlParamsType>();
    const navigation = useNavigate();
    const { apiData: savedMessage, isLoading, fetchApiData: fetchSaveMessage } = useFetchApiData<MessageResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages/${urlParams.id}`);

    useEffect(() => {
        fetchSaveMessage();
    }, []);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
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
                                itemName='コーナー/件名'
                                value={savedMessage?.program_corner ? savedMessage?.program_corner?.name : savedMessage?.subject}
                            />
                            :
                            <MessageItem
                                itemName='コーナー/件名'
                                value={savedMessage?.my_program_corner ? savedMessage?.my_program_corner?.name : savedMessage?.subject}
                            />
                    }
                    <MessageItem
                        itemName='ラジオネーム'
                        value={savedMessage?.radio_name}
                    />
                    {/* # TODO: API側も変更する */}
                    <MessageItem
                        itemName='本名・住所を記載したかどうか'
                        value={savedMessage?.listener_info_flag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='電話番号を記載したかどうか'
                        value={savedMessage?.tel_flag ? 'はい' : 'いいえ'}
                    />
                    <MessageItem
                        itemName='本文'
                        value={savedMessage?.content}
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
