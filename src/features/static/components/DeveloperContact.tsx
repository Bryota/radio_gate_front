import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';

export const DeveloperContact = () => {
    const navigation = useNavigate();

    const click_handler = () => {
        return '';
    }

    useEffect(() => {
        authorized();
    }, []);

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
                    title="Developer Contact"
                    subtitle='開発者コンタクト'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                        is_first_item={true}
                    />
                    <Input
                        key='github'
                        text='GitHubアカウント'
                    />
                    <Input
                        key='languages'
                        text='得意な言語'
                    />
                    <Textarea
                        key='question'
                        text='ご質問'
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
