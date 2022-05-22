import { useRoutes } from 'react-router-dom';

import { Top } from '../features/top';
import { RadioStations } from '../features/radio_station';
import { RadioPrograms } from '../features/radio_program';
import { MyRadioPrograms, MyRadioProgram, CreateMyRadioProgram, EditMyRadioProgram } from '../features/my_radio_program';
import { MessageTemplates, MessageTemplate, CreateMessageTemplate, EditMessageTemplate } from '../features/message_template';
import { Register, Login, ForgotPassword, ForgotPasswordComplete, PasswordReset, PasswordUpdate, AccountDelete } from '../features/auth';
import { Profile, ProfileEdit } from '../features/listener';
import { MessagePost, MessagePostComplete, Messages, Message } from '../features/message';
import { RequestFunctions } from '../features/request_function';

export const AppRoutes = () => {
    const commonRoutes = [{ path: '/', element: <Top /> }];

    //ラジオ関連
    const radioStations = [{ path: '/radio_stations', element: <RadioStations /> }];
    const radioPrograms = [{ path: '/radio_programs', element: <RadioPrograms /> }];
    const myRadioPrograms = [
        { path: '/my_radio_programs', element: <MyRadioPrograms /> },
        { path: '/my_radio_program', element: <MyRadioProgram /> },
        { path: '/my_radio_program/create', element: <CreateMyRadioProgram /> },
        { path: '/my_radio_program/edit', element: <EditMyRadioProgram /> },
    ];
    const messageTemplates = [
        { path: 'message_templates', element: <MessageTemplates /> },
        { path: 'message_template', element: <MessageTemplate /> },
        { path: 'message_template/create', element: <CreateMessageTemplate /> },
        { path: 'message_template/edit', element: <EditMessageTemplate /> },
    ]
    const message = [
        { path: '/message_post', element: <MessagePost /> },
        { path: '/message_post/complete', element: <MessagePostComplete /> },
        { path: '/messages', element: <Messages /> },
        { path: '/message', element: <Message /> },
    ];

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

    //機能リクエスト関連
    const requestFunction = [
        { path: '/request_functions', element: <RequestFunctions /> }
    ]

    const element = useRoutes([...commonRoutes, ...radioStations, ...radioPrograms, ...myRadioPrograms, ...messageTemplates, ...auth, ...listerner, ...message, ...requestFunction]);

    return <>{element}</>
}
