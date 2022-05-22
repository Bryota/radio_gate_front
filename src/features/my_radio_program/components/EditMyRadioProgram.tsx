import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form';
import { Button } from '../../../components/Elements';
import { EditInputItem } from './EditInputItem';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const EditMyRadioProgram = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="My Radio Program Create"
                    subtitle='マイラジオ番組作成'
                />
                <InnerBox>
                    <Input
                        key='name'
                        text='ラジオ番組名'
                        value='ダレハナ'
                        is_first_item={true}
                    />
                    <Input
                        key='email'
                        text='メールアドレス'
                        value='test@example.com'
                        type='email'
                    />
                    <p className="text-left mt-5 h3">番組コーナー</p>
                    <EditInputItem
                        key='corner'
                        text='コーナー名'
                        value='BBSリクエスト'
                    />
                    <EditInputItem
                        key='corner'
                        text='コーナー名'
                        value='スピークアップ'
                    />
                </InnerBox>
                <Button
                    text='更新する'
                    type='post'
                    click_action={click_handler}
                />
                <Button
                    text='削除する'
                    type='delete'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
