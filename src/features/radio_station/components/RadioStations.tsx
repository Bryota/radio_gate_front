import { useEffect, useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { RadioStationList } from './RadioStationList';
import { SearchField } from './SearchField';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { RadioStationsResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RadioStations = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [type, setType] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const { apiData: radioStations, isLoading, fetchApiData } = useFetchApiData<RadioStationsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-stations?page=${currentPage}&type=${type}&keyword=${keyword}`, currentPage);

    useEffect(() => {
        fetchApiData();
    }, [currentPage, type]);

    const setTypeAndResetCurrentPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setType(e.target.value);
    }

    const searchKeyword = async () => {
        setCurrentPage(1);
        await fetchApiData();
    }

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
                <SearchField
                    changeType={(e) => setTypeAndResetCurrentPage(e)}
                    keyword={keyword}
                    changeKeyword={e => setKeyword(e.target.value)}
                    searchKeyword={() => searchKeyword()}
                />
                <div>
                    {
                        radioStations?.data.map((RadioStation) => {
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
