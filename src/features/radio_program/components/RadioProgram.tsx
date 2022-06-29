import { useParams } from 'react-router-dom'
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { CornerList } from './CornerList';
import { SelectedRadioProgram } from './SelectedRadioProgram';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
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

type RadioProgramResponseType = {
    radio_program: RadioProgramType
    isLoading: boolean
}

type ProgramCornersResponseType = {
    program_corners: {
        data: ProgramCornersType[]
    }
    isLoading: boolean
}

export const RadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: radioProgram } = useFetchApiData<RadioProgramResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs/${urlParams.id}`);
    const { apiData: programCorners, isLoading } = useFetchApiData<ProgramCornersResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/program_corners?page=${currentPage}&radio_program=${urlParams.id}`, currentPage);

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
                    subtitle='ラジオ番組'
                />
                <SelectedRadioProgram
                    id={radioProgram?.radio_program.id}
                    name={radioProgram?.radio_program.name}
                    email={radioProgram?.radio_program.email}
                />
                <div className="row">
                    <h2>コーナー一覧</h2>
                </div>
                <div>
                    {programCorners?.program_corners.data.map(programCorner => {
                        return (
                            <CornerList
                                id={programCorner.id}
                                name={programCorner.name}
                                radioProgramId={programCorner.radio_program_id}
                            />
                        )
                    })}
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
