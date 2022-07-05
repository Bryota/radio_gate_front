import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { RadioStationList } from './RadioStationList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { RadioStationsResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RadioStations = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: radioStations, isLoading } = useFetchApiData<RadioStationsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-stations?page=${currentPage}`, currentPage);

    const prevPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page - 1);
    }

    const nextPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Radio Station"
                    subtitle='ラジオ局一覧'
                />
                <div>
                    {
                        radioStations?.radio_stations.data.map((RadioStation) => {
                            return (
                                <RadioStationList
                                    key={RadioStation.id}
                                    id={RadioStation.id}
                                    name={RadioStation.name}
                                />
                            )
                        })
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    prevAction={prevPagination}
                    nextAction={nextPagination}
                />
            </MainLayout>
        </>
    )
}
