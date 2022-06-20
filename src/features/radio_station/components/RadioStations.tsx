import axios from '../../../settings/Axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { RadioStationList } from './RadioStationList';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type RadioStationsType = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export const RadioStations = () => {
    const [radioStations, setRadioStations] = useState<RadioStationsType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchRadioStations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_stations?page=${currentPage}`);
                setRadioStations(response.data.radio_stations.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioStations();
    }, [currentPage]);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
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
                    {
                        radioStations.map((RadioStation) => {
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
                    prev_action={prevPagination}
                    next_action={nextPagination}
                />
            </MainLayout>
        </>
    )
}
