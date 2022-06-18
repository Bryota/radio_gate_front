import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Pagination } from '../../../components/Pagination';
import { MyRadioProgramList } from './MyRadioProgramList';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import '../../../assets/css/elements/radio.css';
import '../../../assets/css/components/pagination.css';

type MyRadioProgramsType = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

export const MyRadioPrograms = () => {
    const [myRadioPrograms, setMyRadioPrograms] = useState<MyRadioProgramsType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchMyRadioPrograms = async () => {
            try {
                const RadioStationNameResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs?page=${currentPage}`);
                setMyRadioPrograms(RadioStationNameResponse.data.listener_my_programs.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMyRadioPrograms();
    }, [currentPage]);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const click_handler = () => {
        navigation('/my_radio_program/create')
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
                <Pagehead
                    title="My Radio Programs"
                    subtitle='マイラジオ番組一覧'
                />
                <Button
                    text='マイラジオ番組を追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div>
                    {myRadioPrograms.map(myRadioProgram => {
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
                    prev_action={prevPagination}
                    next_action={nextPagination}
                />
            </MainLayout>
        </>
    )
}
