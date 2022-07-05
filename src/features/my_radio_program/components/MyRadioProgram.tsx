import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { Loading, FlashMessage } from '../../../components/Elements';
import { CornerList } from './CornerList';
import { SelectedMyRadioProgram } from './SelectedMyRadioProgram';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { UrlParamsType } from '../../../types/common';
import { MyRadioProgramResponseType, MyProgramCornersResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const MyRadioProgram = () => {
    const location = useLocation();
    const urlParams = useParams<UrlParamsType>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
    const { apiData: myRadioProgram } = useFetchApiData<MyRadioProgramResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs/${urlParams.id}`);
    const { apiData: corners, isLoading } = useFetchApiData<MyProgramCornersResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my-program-corners?page=${currentPage}&listener_my_program=${urlParams.id}`);

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
                {locationParams && locationParams.hasOwnProperty('flash_message') ? <FlashMessage message={locationParams.flash_message} /> : <></>}
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
