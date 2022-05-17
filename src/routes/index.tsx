import { useRoutes } from 'react-router-dom';

import { Top } from '../features/top';
import { RadioStations } from '../features/radio_station';
import { Register } from '../features/auth';

export const AppRoutes = () => {
    const commonRoutes = [{ path: '/', element: <Top /> }];

    //ラジオ関連
    const radioStations = [{ path: '/radio_stations', element: <RadioStations /> }];

    // 認証関連
    const auth = [{ path: '/register', element: <Register /> }]

    const element = useRoutes([...commonRoutes, ...radioStations, ...auth]);

    return <>{element}</>
}
