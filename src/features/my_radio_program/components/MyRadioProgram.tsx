import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { CornerList } from './CornerList';
import { AddCornerBtn } from './AddCornerBtn';
import { SelectedMyRadioProgram } from './SelectedMyRadioProgram';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const MyRadioProgram = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="My Radio Program"
                    subtitle='マイラジオ番組'
                />
                <SelectedMyRadioProgram
                    name='ダレハナ'
                    email='test@example.com'
                />
                <AddCornerBtn />
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
