import axios from '../../../settings/Axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Pagination } from '../../../components/Pagination';
import { CornerList } from './CornerList';
import { SelectedMyRadioProgram } from './SelectedMyRadioProgram';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type UrlParamsType = {
    id: string
}

type MyRadioProgramType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

type CornerType = {
    id: number
    listener_my_program_id: number
    name: string
}

export const MyRadioProgram = () => {
    const urlParams = useParams<UrlParamsType>();
    const [myRadioProgram, setMyRadioProgram] = useState<MyRadioProgramType>();
    const [corners, setCorners] = useState<CornerType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchRadioProgram = async () => {
            try {
                const MyRadioProgramResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs/${urlParams.id}`);
                setMyRadioProgram(MyRadioProgramResponse.data.listener_my_program);
                const CornerResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners?page=${currentPage}&listener_my_program=${urlParams.id}`);
                setCorners(CornerResponse.data.my_program_corners.data);
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
                    title="My Radio Program"
                    subtitle='マイラジオ番組'
                />
                <SelectedMyRadioProgram
                    id={myRadioProgram?.id}
                    name={myRadioProgram?.name}
                    email={myRadioProgram?.email}
                />
                <div className="row">
                    <h2>コーナー一覧</h2>
                </div>
                <div>
                    {corners.map(corner => {
                        return (
                            <CornerList
                                key={corner.id}
                                id={corner.id}
                                my_radio_program_id={corner.listener_my_program_id}
                                name={corner.name}
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
