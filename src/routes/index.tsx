import { useRoutes } from 'react-router-dom';

import { Top } from '../features/top';
import { RadioStations } from '../features/radio_station';
import { RadioPrograms, RadioProgram } from '../features/radio_program';
import { MyRadioPrograms, MyRadioProgram, CreateMyRadioProgram, EditMyRadioProgram } from '../features/my_radio_program';
import { MessageTemplates, MessageTemplate, CreateMessageTemplate, EditMessageTemplate } from '../features/message_template';
import { Register, Login, ForgotPassword, ForgotPasswordComplete, PasswordReset, AccountDelete } from '../features/auth';
import { Profile, ProfileEdit } from '../features/listener';
import { MessagePost, MessagePostComplete, Messages, Message, SavedMessages, SavedMessage } from '../features/message';
import { RequestFunctions, RequestFunction, CreateRequestFunctionRequest, VoteRequestFunction } from '../features/request_function';
import { Inquiry, DeveloperContact, HowToUse, NotFound, ServerError } from '../features/static';

import { AdminForgotPassword, AdminLogin, AdminPasswordReset } from '../features/admin/auth';
import { AdminRequestFunctions, AdminRequestFunction, AdminCreateRequestFunction, AdminEditRequestFunction } from '../features/admin/request_function';
import { AdminRequestFunctionRequests, AdminRequestFunctionRequest } from '../features/admin/request_function_request';
import { AdminRadioStations, AdminCreateRadioStation, AdminEditRadioStation } from '../features/admin/radio_station';
import { AdminRadioPrograms, AdminRadioProgram, AdminCreateRadioProgram, AdminEditRadioProgram, AdminCreateCorner, AdminEditCorner } from '../features/admin/radio_program';

export const AppRoutes = () => {
    const commonRoutes = [{ path: '/', element: <Top /> }];

    //ラジオ関連
    const radioStations = [{ path: '/radio_stations', element: <RadioStations /> }];
    const radioPrograms = [
        { path: '/radio_programs/:radioStationId', element: <RadioPrograms /> },
        { path: '/radio_program/:id', element: <RadioProgram /> },
    ];
    const myRadioPrograms = [
        { path: '/my_radio_programs', element: <MyRadioPrograms /> },
        { path: '/my_radio_program/:id', element: <MyRadioProgram /> },
        { path: '/my_radio_program/create', element: <CreateMyRadioProgram /> },
        { path: '/my_radio_program/:id/edit', element: <EditMyRadioProgram /> },
    ];
    const messageTemplates = [
        { path: 'message_templates', element: <MessageTemplates /> },
        { path: 'message_template/:id', element: <MessageTemplate /> },
        { path: 'message_template/create', element: <CreateMessageTemplate /> },
        { path: 'message_template/:id/edit', element: <EditMessageTemplate /> },
    ]
    const message = [
        { path: '/message_post', element: <MessagePost /> },
        { path: '/message_post/complete', element: <MessagePostComplete /> },
        { path: '/messages', element: <Messages /> },
        { path: '/message/:id', element: <Message /> },
        { path: '/saved_messages', element: <SavedMessages /> },
        { path: '/saved_message/:id', element: <SavedMessage /> },
    ];

    // 認証関連
    const auth = [
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: 'forgot_password', element: <ForgotPassword /> },
        { path: 'forgot_password/complete', element: <ForgotPasswordComplete /> },
        { path: 'password_reset', element: <PasswordReset /> },
        { path: 'account_delete', element: <AccountDelete /> }
    ]

    // リスナー関連
    const listerner = [
        { path: '/profile', element: <Profile /> },
        { path: '/profile/edit', element: <ProfileEdit /> }
    ]

    //機能リクエスト関連
    const requestFunction = [
        { path: '/request_functions', element: <RequestFunctions /> },
        { path: '/request_function/:id', element: <RequestFunction /> },
        { path: '/request_function/request', element: <CreateRequestFunctionRequest /> },
        { path: '/request_function/:id/vote', element: <VoteRequestFunction /> },
    ]

    // 静的ページ
    const staticPage = [
        { path: '/inquery', element: <Inquiry /> },
        { path: '/developer_contact', element: <DeveloperContact /> },
        { path: '/how_to_use', element: <HowToUse /> },
        { path: '/server_error', element: <ServerError /> },
        { path: '/*', element: <NotFound /> },
    ];

    // 管理者
    // 認証関連
    const adminAuth = [
        { path: 'admin/forgot_password', element: <AdminForgotPassword /> },
        { path: 'admin/login', element: <AdminLogin /> },
        { path: 'admin/password_reset', element: <AdminPasswordReset /> },
    ];

    //機能リクエスト関連
    const adminRequestFunction = [
        { path: 'admin/request_functions', element: <AdminRequestFunctions /> },
        { path: 'admin/request_function/:id', element: <AdminRequestFunction /> },
        { path: 'admin/request_function/create', element: <AdminCreateRequestFunction /> },
        { path: 'admin/request_function/:id/edit', element: <AdminEditRequestFunction /> },
    ];

    //機能リクエスト申請関連
    const adminRequestFunctionRequest = [
        { path: 'admin/request_function_requests', element: <AdminRequestFunctionRequests /> },
        { path: 'admin/request_function_request/:id', element: <AdminRequestFunctionRequest /> },
    ];

    // ラジオ関連
    const adminRadioStation = [
        { path: 'admin/radio_stations', element: <AdminRadioStations /> },
        { path: 'admin/radio_station/create', element: <AdminCreateRadioStation /> },
        { path: 'admin/radio_station/:id/edit', element: <AdminEditRadioStation /> },
    ]
    const adminRadioProgram = [
        { path: 'admin/radio_programs/:radioStationId', element: <AdminRadioPrograms /> },
        { path: 'admin/radio_program/:id', element: <AdminRadioProgram /> },
        { path: 'admin/radio_program/create', element: <AdminCreateRadioProgram /> },
        { path: 'admin/radio_program/:id/edit', element: <AdminEditRadioProgram /> },
        { path: 'admin/radio_program/:radioProgramId/corner/create', element: <AdminCreateCorner /> },
        { path: 'admin/radio_program/:radioProgramId/corner/:id/edit', element: <AdminEditCorner /> },
    ]

    const element = useRoutes([
        ...commonRoutes,
        ...radioStations,
        ...radioPrograms,
        ...myRadioPrograms,
        ...messageTemplates,
        ...auth,
        ...listerner,
        ...message,
        ...requestFunction,
        ...staticPage,
        ...adminAuth,
        ...adminRequestFunction,
        ...adminRequestFunctionRequest,
        ...adminRadioStation,
        ...adminRadioProgram
    ]);

    return <>{element}</>
}
