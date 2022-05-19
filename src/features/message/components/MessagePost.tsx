import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { Input, CheckBox, Textarea } from '../../../components/Form';
import '../../../assets/css/pagination.css';

export const MessagePost = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Post"
                    subtitle='メッセージ投稿'
                />
                <InnerBox>
                    <CheckBox
                        label='is_used_my_radio_program'
                        text='マイラジオ番組を使用する'
                        is_first_item={true}
                    />
                    <Input
                        key='radio_program'
                        text='番組'
                    />
                    <Input
                        key='corner'
                        text='番組'
                    />
                    <span>※コーナーを選択した場合、コーナー名が件名になります</span>
                    <Input
                        key='subject'
                        text='件名'
                    />
                    <Input
                        key='radio_name'
                        text='ラジオネーム'
                        value='ハイキングベアー'
                    />
                    <CheckBox
                        label='is_used_message_template'
                        text='メッセージテンプレートを使用する'
                    />
                    <Input
                        key='message_template'
                        text='テンプレート名'
                    />
                    <Textarea
                        key='content'
                        text='本文'
                    />
                    <CheckBox
                        label='is_sent_userifno'
                        text='本名・住所を記載する'
                    />
                    <CheckBox
                        label='is_sent_tel'
                        text='電話番号を記載する'
                    />
                </InnerBox>
                <Button
                    text='投稿する'
                    type='post'
                    click_action={click_handler}
                />
                <Button
                    text='一時保存'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
