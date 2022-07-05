import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading, FlashMessage } from '../../../components/Elements';
import { Pagination } from '../../../components/Pagination';
import { MyRadioProgramList } from './MyRadioProgramList';
import { useFetchApiData } from '../../../hooks/useFetchApiData';

import { MyRadioProgramsResponseType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

export const MyRadioPrograms = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
    const navigation = useNavigate();
    const { apiData: myRadioPrograms, isLoading } = useFetchApiData<MyRadioProgramsResponseType>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs?page=${currentPage}`, currentPage);

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
                    title="My Radio Programs"
                    subtitle='マイラジオ番組一覧'
                />
                <Button
                    text='マイラジオ番組を追加'
                    type='post'
                    line_left={true}
                    clickAction={() => navigation('/my_radio_program/create')}
                />
                <div>
                    {myRadioPrograms?.listener_my_programs.data.map(myRadioProgram => {
                        return (
                            <MyRadioProgramList
                                key={myRadioProgram.id}
                                id={myRadioProgram.id}
                                name={myRadioProgram.name}
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
