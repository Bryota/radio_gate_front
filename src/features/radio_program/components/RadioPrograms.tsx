import axios from 'axios';
import { useParams } from 'react-router-dom'
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

    useEffect(() => {
        const fetchRadioPrograms = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs?radio_station=${urlParams.radio_station_id}`);
                setRadioPrograms(response.data.radio_programs)
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioPrograms();
    }, []);
    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Radio Program"
                    subtitle='ラジオ番組一覧'
                />
                <RadioStation
                    name='ニッポン放送'
                />
                <div>
                    {radioPrograms.map(radioProgram => {
                        return (
                            <RadioProgramList
                                id={radioProgram.id}
                                name={radioProgram.name}
                                key={radioProgram.id}
                            />
                        )
                    })}

                </div>
                <Pagination />
            </MainLayout>
        </>
    )
}
