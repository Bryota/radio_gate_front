import axios from '../../../settings/Axios';
import { useParams, useNavigate } from 'react-router-dom'

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { SelectedMessageTemplate } from './SelectedMessageTemplate';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { UrlParamsType } from '../../../types/common';
import { MessageTemplateResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import { useEffect } from 'react';

export const MessageTemplate = () => {
    const urlParams = useParams<UrlParamsType>();
    const navigation = useNavigate();
    const { apiData: messageTemplate, isLoading, fetchApiData: fetchMessageTemplate } = useFetchApiData<MessageTemplateResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates/${urlParams.id}`);

    useEffect(() => {
        fetchMessageTemplate();
    }, [])
    const deleteMessageTemplate = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates/${urlParams.id}`);
            return (
                navigation('/message_templates', { state: { flash_message: 'メッセージテンプレートを削除しました' } })
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Message Template"
                    subtitle='メッセージテンプレート'
                />
                <SelectedMessageTemplate
                    name={messageTemplate?.name}
                />
                <div>
                    <p className='h3 mb-4'>本文</p>
                    <InnerBox>{messageTemplate?.content}</InnerBox>
                </div>
                <Button
                    text='編集する'
                    type='post'
                    clickAction={() => navigation(`edit`)}
                />
                <Button
                    text='削除する'
                    type='delete'
                    clickAction={deleteMessageTemplate}
                />
            </MainLayout>
        </>
    )
}
