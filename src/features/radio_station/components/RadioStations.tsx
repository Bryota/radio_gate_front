import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { RadioStationList } from './RadioStationList';
import '../../../assets/css/radio.css';
import '../../../assets/css/pagination.css';

export const RadioStations = () => {
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Radio Station"
                    subtitle='ラジオ局一覧'
                />
                <div>
                    <RadioStationList
                        name="ニッポン放送"
                    />
                    <RadioStationList
                        name="文化放送"
                    />
                    <RadioStationList
                        name="TBSラジオ"
                    />
                    <RadioStationList
                        name="Tokyofm"
                    />
                    <RadioStationList
                        name="J-WAVE"
                    />
                    <RadioStationList
                        name="Interfm"
                    />
                    <RadioStationList
                        name="bayfm78"
                    />
                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
