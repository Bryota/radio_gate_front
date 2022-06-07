import axios from '../../../settings/Axios';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { RadioStationList } from './RadioStationList';
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

    useEffect(() => {
        const fetchRadioStations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_stations`);
                setRadioStations(response.data.radio_stations)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioStations();
    }, []);

    return (
        <>
            <MainLayout>
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
                <Pagination />
            </MainLayout>
        </>
    )
}
