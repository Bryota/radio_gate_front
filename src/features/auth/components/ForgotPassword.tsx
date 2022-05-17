import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const ForgotPassword = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Forgot Password"
                    subtitle='パスワード再設定用メール送信'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                        type="email"
                        is_first_item={true}
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
