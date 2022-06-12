import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';

export const NotFound = () => {
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="No Found"
                    subtitle='ページが見つかりません'
                />
            </MainLayout>
        </>
    )
}
