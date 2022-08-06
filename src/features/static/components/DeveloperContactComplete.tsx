import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { isAuthorized } from '../../../modules/auth/isAuthorized';

export const DeveloperContactComplete = () => {
    const navigation = useNavigate();

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
                    title="Developer Contact Complete"
                    subtitle='開発者コンタクト送信完了'
                />
                <div className='text-center mt-5 mb-4'>
                    <p className='h4'>開発者コンタクトを送信しました </p>
                </div>
                <Button
                    text='トップ'
                    type='get'
                    clickAction={() => {
                        return navigation('/messages')
                    }}
                />
            </MainLayout>
        </>
    )
}
