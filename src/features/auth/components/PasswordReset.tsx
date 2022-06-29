import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const PasswordReset = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Password Reset"
                    subtitle='パスワード再設定'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                        type="email"
                        is_first_item={true}
                    />
                    <Input
                        key='password'
                        text='パスワード'
                        type="password"
                    />
                    <Input
                        key='password_confirm'
                        text='パスワード確認'
                        type="password_confirm"
                    />
                </InnerBox>
                <Button
                    text='パスワード再設定'
                    type='post'
                    clickAction={click_handler}
                />
            </MainLayout>
        </>
    )
}
