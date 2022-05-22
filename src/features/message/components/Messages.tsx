import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { MessageList } from './MessageList';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const Messages = () => {
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Messages"
                    subtitle='投稿一覧'
                />
                <div>
                    <MessageList
                        radio_program="オードリーのオールナイトニッポン"
                        corner='死んでもやめんじゃねーぞ'
                        post_date='2022年10月07日 21:45'
                    />
                    <MessageList
                        radio_program="オードリーのオールナイトニッポン"
                        corner='死んでもやめんじゃねーぞ'
                        post_date='2022年10月07日 21:45'
                    />
                    <MessageList
                        radio_program="オードリーのオールナイトニッポン"
                        corner='死んでもやめんじゃねーぞ'
                        post_date='2022年10月07日 21:45'
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
