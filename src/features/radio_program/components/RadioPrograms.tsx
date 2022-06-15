import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { RadioStation } from './RadioStation';
import { RadioProgramList } from './RadioProgramList';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type UrlParamsType = {
    radio_station_id: string
}

type RadioProgramsType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

export const RadioPrograms = () => {
    const urlParams = useParams<UrlParamsType>();
    const [radioPrograms, setRadioPrograms] = useState<RadioProgramsType[]>([]);
    const [radioStationName, setRadioStationName] = useState<string>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchRadioPrograms = async () => {
            try {
                const RadioStationNameResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_station_name/${urlParams.radio_station_id}`);
                setRadioStationName(RadioStationNameResponse.data.radio_station_name);

                const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs?page=${currentPage}&radio_station=${urlParams.radio_station_id}`);
                setRadioPrograms(RadioProgramsResponse.data.radio_programs.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioPrograms();
    }, [currentPage]);

    const prevPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page - 1);
    }

    const nextPagination = () => {
        setCurrentPage((pre_current_page) => pre_current_page + 1);
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Radio Program"
                    subtitle='ラジオ番組一覧'
                />
                <RadioStation
                    name={radioStationName}
                />
                <div>
                    {
                        radioPrograms.map(radioProgram => {
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
                    prev_action={prevPagination}
                    next_action={nextPagination}
                />
            </MainLayout>
        </>
    )
}
