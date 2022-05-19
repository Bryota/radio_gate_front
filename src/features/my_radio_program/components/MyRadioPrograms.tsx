import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Pagination } from '../../../components/Pagination';
import { MyRadioProgramList } from './MyRadioProgramList';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const MyRadioPrograms = () => {
    const click_handler = () => {
        return '';
    }
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="My Radio Programs"
                    subtitle='マイラジオ番組一覧'
                />
                <Button
                    text='マイラジオ番組を追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    <MyRadioProgramList
                        name="オードリーのオールナイトニッポン"
                    />
                    <MyRadioProgramList
                        name="佐久間宣行のオールナイトニッポン0"
                    />
                    <MyRadioProgramList
                        name="乃木坂のオールナイトニッポン"
                    />
                    <MyRadioProgramList
                        name="CreepyNutsのオールナイトニッポン"
                    />
                    <MyRadioProgramList
                        name="星野源のオールナイトニッポン"
                    />
                    <MyRadioProgramList
                        name="日向坂46松田好花の日向坂高校放送部"
                    />
                    <MyRadioProgramList
                        name="上柳昌彦　あさぼらけ"
                    />
                    <MyRadioProgramList
                        name="土田晃之　日曜のへそ"
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
