import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { RadioStationList } from './RadioStationList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type RadioStationType = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

type RadioStationsResponseType = {
    radio_stations: {
        data: RadioStationType[]
    }
    isLoading: boolean
}

export const RadioStations = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: radioStations, isLoading } = useFetchApiData<RadioStationsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_stations?page=${currentPage}`, currentPage);

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
