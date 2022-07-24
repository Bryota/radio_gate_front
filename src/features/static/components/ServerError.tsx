import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';

export const ServerError = () => {
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Server Error"
                    subtitle='サーバーエラー'
                />
            </MainLayout>
        </>
    )
}
