import { useRoutes } from 'react-router-dom';

import { Top } from '../features/top';
import { RadioStations } from '../features/radio_station';
import { RadioPrograms } from '../features/radio_program';
import { Register, Login, ForgotPassword, ForgotPasswordComplete, PasswordReset, PasswordUpdate, AccountDelete } from '../features/auth';
import { Profile, ProfileEdit } from '../features/listener';
import { MessagePost } from '../features/message';

export const AppRoutes = () => {
    const commonRoutes = [{ path: '/', element: <Top /> }];

    //ラジオ関連
    const radioStations = [{ path: '/radio_stations', element: <RadioStations /> }];
    const radioPrograms = [{ path: '/radio_programs', element: <RadioPrograms /> }];
    const message = [{ path: '/message_post', element: <MessagePost /> }];

    // 認証関連
    const auth = [
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: 'forgot_password', element: <ForgotPassword /> },
        { path: 'forgot_password_complete', element: <ForgotPasswordComplete /> },
        { path: 'password_reset', element: <PasswordReset /> },
        { path: 'password_update', element: <PasswordUpdate /> },
        { path: 'account_delete', element: <AccountDelete /> }
    ]

    // リスナー関連
    const listerner = [
        { path: '/listener', element: <Profile /> },
        { path: '/listener/edit', element: <ProfileEdit /> }
    ]

    const element = useRoutes([...commonRoutes, ...radioStations, ...radioPrograms, ...auth, ...listerner, ...message]);

    return <>{element}</>
}
