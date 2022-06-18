import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';

export const Inquiry = () => {
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
    }, []);

    const click_handler = () => {
        return '';
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
                    title="Inquery"
                    subtitle='お問い合わせ'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                        is_first_item={true}
                    />
                    <Input
                        key='type'
                        text='問い合わせ種別'
                    />
                    <Textarea
                        key='content'
                        text='詳細'
                    />
                </InnerBox>
                <Button
                    text='送信する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
