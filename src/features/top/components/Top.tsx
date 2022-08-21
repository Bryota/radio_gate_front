import { useEffect } from 'react';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Loading, FlashMessage } from '../../../components/Elements';
import { useFetchApiData } from '../../../hooks/useFetchApiData';
import { useFlashMessage } from '../../../hooks/useFlashMessage';
import { TopList } from './TopList';
import { TopFunction } from './TopFunction';

import { RecentPostRadioProgramsType } from '../../../types/listener';

import '../../../assets/css/elements/top.css';

export const Top = (): JSX.Element => {
    const { apiData: recentPostRadioPrograms, fetchApiData: fetchrecentPostRadioPrograms } = useFetchApiData<RecentPostRadioProgramsType[]>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener/recent_post_radio_programs`, 0);
    const { apiData: mostPostRadioPrograms, isLoading, fetchApiData: fetchMostPostRadioPrograms } = useFetchApiData<RecentPostRadioProgramsType[]>(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener/most_post_radio_programs`, 0);
    const flashMessage = useFlashMessage();

    useEffect(() => {
        fetchrecentPostRadioPrograms();
        fetchMostPostRadioPrograms();
    }, []);

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : null}
                {flashMessage ? <FlashMessage message={flashMessage} /> : null}
                <Pagehead
                    title="Top"
                    subtitle='トップ'
                />
                <TopList
                    listName='最近投稿した番組'
                    radioPrograms={recentPostRadioPrograms}
                />
                <TopList
                    listName='投稿の多い番組'
                    radioPrograms={mostPostRadioPrograms}
                />
                <TopFunction />
            </MainLayout>
        </>
    )
};
