import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading } from '../../../components/Elements';
import { CornerList } from './CornerList';
import { SelectedRadioProgram } from './SelectedRadioProgram';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { UrlParamsType } from '../../../types/common';
import { RadioProgramResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const RadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: radioProgram, isLoading, fetchApiData: fetchRadioProgram } = useFetchApiData<RadioProgramResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs/${urlParams.id}`);

    useEffect(() => {
        fetchRadioProgram();
    }, []);

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
                    id={radioProgram?.id}
                    name={radioProgram?.name}
                    email={radioProgram?.email}
                />
                <div className="row">
                    <h2>コーナー一覧</h2>
                </div>
                <div>
                    {radioProgram?.program_corners?.map(programCorner => {
                        return (
                            <CornerList
                                id={programCorner.id}
                                name={programCorner.name}
                                programId={programCorner.radio_program_id}
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
