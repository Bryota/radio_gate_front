import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading, FlashMessage } from '../../../components/Elements';
import { CornerList } from './CornerList';
import { SelectedMyRadioProgram } from './SelectedMyRadioProgram';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { useFlashMessage } from '../../../hooks/useFlashMessage';

import { UrlParamsType } from '../../../types/common';
import { MyRadioProgramResponseType, MyProgramCornersResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const MyRadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { apiData: myRadioProgram } = useFetchApiData<MyRadioProgramResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs/${urlParams.id}`);
    const { apiData: corners, isLoading } = useFetchApiData<MyProgramCornersResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my-program-corners?page=${currentPage}&listener_my_program=${urlParams.id}`);
    const flashMessage = useFlashMessage();

    const prevPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage - 1);
    }

    const nextPagination = () => {
        setCurrentPage((preCurrentPage) => preCurrentPage + 1);
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : null}
                {flashMessage ? <FlashMessage message={flashMessage} /> : null}
                <Pagehead
                    title="My Radio Program"
                    subtitle='マイラジオ番組'
                />
                <SelectedMyRadioProgram
                    id={myRadioProgram?.listener_my_program.id}
                    name={myRadioProgram?.listener_my_program.name}
                    email={myRadioProgram?.listener_my_program.email}
                />
                <div className="row">
                    <h2>コーナー一覧</h2>
                </div>
                <div>
                    {corners?.my_program_corners.data.map(corner => {
                        return (
                            <CornerList
                                key={corner.id}
                                id={corner.id}
                                programId={corner.programId}
                                name={corner.name}
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
