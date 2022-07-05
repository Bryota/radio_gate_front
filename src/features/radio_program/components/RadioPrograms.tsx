import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { RadioStation } from './RadioStation';
import { RadioProgramList } from './RadioProgramList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { RadioProgramsUrlParamsType, RadioStationNameResponseType, RadioProgramsResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RadioPrograms = () => {
    const urlParams = useParams<RadioProgramsUrlParamsType>();
    console.log(urlParams)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: radioStationName } = useFetchApiData<RadioStationNameResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-station/${urlParams.radioStationId}/name`);
    const { apiData: radioPrograms, isLoading } = useFetchApiData<RadioProgramsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs?page=${currentPage}&radio_station=${urlParams.radioStationId}`, currentPage);

    const prevPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage - 1);
    }

    const nextPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Radio Program"
                    subtitle='ラジオ番組一覧'
                />
                <RadioStation
                    name={radioStationName?.radio_station_name}
                />
                <div>
                    {
                        radioPrograms?.radio_programs.data.map(radioProgram => {
                            return (
                                <RadioProgramList
                                    id={radioProgram.id}
                                    name={radioProgram.name}
                                    key={radioProgram.id}
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
