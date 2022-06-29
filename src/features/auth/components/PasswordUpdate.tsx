import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Input } from '../../../components/Form/Input';
import { Button } from '../../../components/Elements/Button';

export const PasswordUpdate = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Password Update"
                    subtitle='パスワード更新'
                />
                <InnerBox>
                    <Input
                        key='old-password'
                        text='現在のパスワード'
                        type="password"
                        is_first_item={true}
                    />
                    <Input
                        key='password'
                        text='新しいパスワード'
                        type="password"
                    />
                    <Input
                        key='password_confirm'
                        text='パスワード確認'
                        type="password_confirm"
                    />
                </InnerBox>
                <Button
                    text='パスワード更新'
                    type='post'
                    clickAction={click_handler}
                />
            </MainLayout>
        </>
    )
}
