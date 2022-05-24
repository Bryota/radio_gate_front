import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRequestFunctionList } from './RequestFunctionList';

export const AdminRequestFunctions = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト一覧"
                />
                <AdminButton
                    text='追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    <AdminRequestFunctionList
                        title='複数の住所を登録したい'
                        post_date='2022年10月07日'
                    />
                    <AdminRequestFunctionList
                        title='複数の住所を登録したい'
                        post_date='2022年10月07日'
                    />
                    <AdminRequestFunctionList
                        title='複数の住所を登録したい'
                        post_date='2022年10月07日'
                    />
                    <AdminRequestFunctionList
                        title='複数の住所を登録したい'
                        post_date='2022年10月07日'
                    />
                    <AdminRequestFunctionList
                        title='複数の住所を登録したい'
                        post_date='2022年10月07日'
                    />
                </div>
            </AdminMainLayout>
        </>
    )
}
