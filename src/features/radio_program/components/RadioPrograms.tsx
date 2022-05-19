import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { RadioStation } from './RadioStation';
import { RadioProgramList } from './RadioProgramList';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const RadioPrograms = () => {
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Radio Program"
                    subtitle='ラジオ番組一覧'
                />
                <RadioStation
                    name='ニッポン放送'
                />
                <div>
                    <RadioProgramList
                        name="オードリーのオールナイトニッポン"
                    />
                    <RadioProgramList
                        name="佐久間宣行のオールナイトニッポン0"
                    />
                    <RadioProgramList
                        name="乃木坂のオールナイトニッポン"
                    />
                    <RadioProgramList
                        name="CreepyNutsのオールナイトニッポン"
                    />
                    <RadioProgramList
                        name="星野源のオールナイトニッポン"
                    />
                    <RadioProgramList
                        name="日向坂46松田好花の日向坂高校放送部"
                    />
                    <RadioProgramList
                        name="上柳昌彦　あさぼらけ"
                    />
                    <RadioProgramList
                        name="土田晃之　日曜のへそ"
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
