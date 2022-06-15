import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { CornerList } from './CornerList';
import { SelectedRadioProgram } from './SelectedRadioProgram';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type UrlParamsType = {
    id: string
}

type RadioProgramType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

type ProgramCornersType = {
    id: number
    radio_program_id: number
    name: string
}

export const RadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [radioProgram, setRadioProgram] = useState<RadioProgramType>();
    const [programCorners, setProgramCorners] = useState<ProgramCornersType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const RadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs/${urlParams.id}`);
                setRadioProgram(RadioProgramResponse.data.radio_program);
                const ProgramConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/program_corners?page=${currentPage}&radio_program=${urlParams.id}`);
                setProgramCorners(ProgramConrernsResponse.data.program_corners.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
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
                    subtitle='ラジオ番組'
                />
                <SelectedRadioProgram
                    id={radioProgram?.id}
                    name={radioProgram?.name}
                    email={radioProgram?.email}
                />
                <div className="row">
                    <h2>コーナー一覧</h2>
                </div>
                <div>
                    {programCorners.map(programCorner => {
                        return (
                            <CornerList
                                id={programCorner.id}
                                name={programCorner.name}
                                radio_program_id={programCorner.radio_program_id}
                            />
                        )
                    })}
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
