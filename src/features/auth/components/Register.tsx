import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const Register = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Register"
                    subtitle='新規登録'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                    />
                    <Input
                        key='password'
                        text='パスワード'
                        type="password"
                    />
                    <Input
                        key='first_name'
                        text='姓'
                    />
                    <Input
                        key='last_name'
                        text='名'
                    />
                    <Input
                        key='first_name_kana'
                        text='姓かな'
                    />
                    <Input
                        key='last_name_kana'
                        text='名かな'
                    />
                    <Input
                        key='radio_name'
                        text='ラジオネーム'
                    />
                    <Input
                        key='post_code'
                        text='郵便番号'
                        is_post_code={true}
                    />
                    <Input
                        key='prefecture'
                        text='都道府県'
                    />
                    <Input
                        key='city'
                        text='市区町村'
                    />
                    <Input
                        key='house_number'
                        text='番地'
                    />
                    <Input
                        key='building'
                        text='建物'
                    />
                    <Input
                        key='room_number'
                        text='部屋番号'
                    />
                    <Input
                        key='tel'
                        text='電話番号'
                    />
                </InnerBox>
                <Button
                    text='始める'
                    type='post'
                    click_action={click_handler}
                />
                <div className='text-center pb-5'>
                    <a href="/login">ログインの方はこちら</a>
                </div>
            </MainLayout>
        </>
    )
}
