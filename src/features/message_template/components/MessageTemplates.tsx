import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Pagination } from '../../../components/Pagination';
import { MessageTemplateList } from './MessageTemplateList';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const MessageTemplates = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Templates"
                    subtitle='メッセージテンプレート一覧'
                />
                <Button
                    text='テンプレートを追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    <MessageTemplateList
                        name="お昼の番組ふつおた"
                    />
                    <MessageTemplateList
                        name="深夜番組ふつおた"
                    />
                    <MessageTemplateList
                        name="死んでもやめんじゃねーぞ"
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
