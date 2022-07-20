import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { RadioStation } from './RadioStation';
import { RadioProgramList } from './RadioProgramList';
import { SearchField } from './SearchField';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { RadioProgramsUrlParamsType, RadioStationNameResponseType, RadioProgramsResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RadioPrograms = () => {
    const urlParams = useParams<RadioProgramsUrlParamsType>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [day, setDay] = useState<string>('');
    const { apiData: radioStationName, fetchApiData: fetchRadioStationName } = useFetchApiData<RadioStationNameResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-station/${urlParams.radioStationId}/name`);
    const { apiData: radioPrograms, isLoading, fetchApiData: fetchRadioPrograms } = useFetchApiData<RadioProgramsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs?page=${currentPage}&radio_station=${urlParams.radioStationId}&day=${day}`, currentPage);

    useEffect(() => {
        fetchRadioStationName();
        fetchRadioPrograms();
    }, [currentPage, day]);

    const setDayAndResetCurrentPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setDay(e.target.value);
    }

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
                <SearchField
                    changeDay={(e) => setDayAndResetCurrentPage(e)}
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
