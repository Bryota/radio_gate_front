import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { HowToUseItem } from './HowToUseItem';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/components/how_to_use.css';

export const HowToUse = () => {
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
                    title="How To Use"
                    subtitle='使い方'
                />
                <InnerBox>
                    <HowToUseItem
                        title='メッセージの送り方'
                        text='サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト'
                    />
                    <HowToUseItem
                        title='マイ番組に関して'
                        text='サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト'
                    />
                    <HowToUseItem
                        title='メッセージテンプレートに関して'
                        text='サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト'
                    />
                    <HowToUseItem
                        title='機能リクエストに関して'
                        text='サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト
                    サンプルテキストサンプルテキストサンプルテキスト'
                    />
                </InnerBox>
            </MainLayout>
        </>
    )
}
