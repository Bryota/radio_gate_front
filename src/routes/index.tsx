import { useRoutes } from 'react-router-dom';

import { Top } from '../features/top';
import { RadioStations } from '../features/radio_station';
import { Register, Login, ForgotPassword, ForgotPasswordComplete, PasswordReset } from '../features/auth';

export const AppRoutes = () => {
    const commonRoutes = [{ path: '/', element: <Top /> }];

    //ラジオ関連
    const radioStations = [{ path: '/radio_stations', element: <RadioStations /> }];

    // 認証関連
    const auth = [
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: 'forgot_password', element: <ForgotPassword /> },
        { path: 'forgot_password_complete', element: <ForgotPasswordComplete /> },
        { path: 'password_reset', element: <PasswordReset /> }
    ]

    const element = useRoutes([...commonRoutes, ...radioStations, ...auth]);

    return <>{element}</>
}
