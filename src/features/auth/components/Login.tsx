import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const Login = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Login"
                    subtitle='ログイン'
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
                </InnerBox>
                <Button
                    text='ログインする'
                    type='post'
                    click_action={click_handler}
                />
                <div className='text-center mb-3'>
                    <a href="/register">新規登録の方はこちら</a>
                </div>
                <div className='text-center pb-5'>
                    <a href="/forgot_password">パスワードを忘れた方はこちら</a>
                </div>
            </MainLayout>
        </>
    )
}
