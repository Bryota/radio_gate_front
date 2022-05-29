import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { CornerList } from './CornerList';
import { SelectedRadioProgram } from './SelectedRadioProgram';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RadioProgram = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Radio Program"
                    subtitle='ラジオ番組'
                />
                <SelectedRadioProgram
                    name='ダレハナ'
                    email='test@example.com'
                />
                <div>
                    <CornerList
                        name="オードリーのオールナイトニッポン"
                    />
                    <CornerList
                        name="佐久間宣行のオールナイトニッポン0"
                    />
                    <CornerList
                        name="乃木坂のオールナイトニッポン"
                    />
                    <CornerList
                        name="CreepyNutsのオールナイトニッポン"
                    />
                    <CornerList
                        name="星野源のオールナイトニッポン"
                    />
                    <CornerList
                        name="日向坂46松田好花の日向坂高校放送部"
                    />
                    <CornerList
                        name="上柳昌彦　あさぼらけ"
                    />
                    <CornerList
                        name="土田晃之　日曜のへそ"
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
