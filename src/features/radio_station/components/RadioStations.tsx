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
    const [type, setType] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const { apiData: radioStations, isLoading } = useFetchApiData<RadioStationsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-stations?page=${currentPage}`, currentPage);

    const searchKeyword = async () => {
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
                <div>
                    <div className='border-0 text-start p-0 m-0'>
                        <input id="type-all" type="radio" name="type" value="FM" defaultChecked={true} />
                        <label className="radio-inline__label" htmlFor="type-all">
                            ALL
                        </label>
                        <input id="type-am" type="radio" name="type" value="AM" />
                        <label className="radio-inline__label" htmlFor="type-am">
                            AM
                        </label>
                        <input id="type-fm" type="radio" name="type" value="FM" />
                        <label className="radio-inline__label" htmlFor="type-fm">
                            FM
                        </label>
                    </div>
                    <div className='mt-4'>
                        <input type="search" name="keyword" id="keyword" className='search-keyword__input' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        <button className='search-keyword__button' onClick={searchKeyword}>検索</button>
                    </div>
                </div>
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
