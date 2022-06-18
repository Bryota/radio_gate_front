import axios from '../../../settings/Axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';

export const CreateMessageTemplate = () => {
    const [name, setName] = useState<string>();
    const [content, setContent] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
    }, []);

    const create_handler = async () => {
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates`, {
            name,
            content
        }).then(res => {
            // TODO: エラー時の処理追加
            if (res.status === 201) {
                alert('作成しました')
            } else {
                console.log(res.data.message);
            }
        });
    }

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Template Create"
                    subtitle='メッセージテンプレート作成'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='テンプレート名'
                        is_first_item={true}
                        change_action={e => setName(e.target.value)}
                    />
                    <Textarea
                        key='body'
                        text='本文'
                        change_action={e => setContent(e.target.value)}
                    />
                </InnerBox>
                <Button
                    text='作成する'
                    type='post'
                    click_action={create_handler}
                />
            </MainLayout>
        </>
    )
}
