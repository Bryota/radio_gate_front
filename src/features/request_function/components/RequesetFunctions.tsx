import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Pagination } from '../../../components/Pagination';
import { RequestFunctionList } from './RequestFunctionList';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const RequestFunctions = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Request Functions"
                    subtitle='機能リクエスト一覧'
                />
                <Button
                    text='機能リクエストを追加'
                    type='get'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    <RequestFunctionList
                        name="住所を複数登録できる"
                        point={15}
                    />
                    <RequestFunctionList
                        name="住所を複数登録できる"
                        point={15}
                    />
                    <RequestFunctionList
                        name="住所を複数登録できる"
                        point={15}
                    />
                    <RequestFunctionList
                        name="住所を複数登録できる"
                        point={15}
                    />
                    <RequestFunctionList
                        name="住所を複数登録できる"
                        point={15}
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
