import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form';
import { Button } from '../../../components/Elements';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const CreateMyRadioProgram = () => {
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
                        is_first_item={true}
                    />
                    <Input
                        key='email'
                        text='メールアドレス'
                        type='email'
                    />
                    <p className="text-left mt-5 h3">番組コーナー</p>
                    <Input
                        key='corner'
                        text='コーナー名'
                    />
                    <Button
                        text='コーナーを増やす'
                        type='get'
                        line_left={true}
                        click_action={click_handler}
                    />
                </InnerBox>
                <Button
                    text='作成する'
                    type='post'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
