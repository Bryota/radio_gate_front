import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { Messages } from '../../features/message';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages?page=1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            data: [
                {
                    id: 1,
                    listener_id: 1,
                    radio_program_id: 1,
                    program_corner_id: 1,
                    listener_my_program: null,
                    listener_my_program_id: null,
                    my_program_corner: null,
                    my_program_corner_id: null,
                    radio_name: null,
                    subject: null,
                    content: "投稿1",
                    listener_info_flag: 0,
                    tel_flag: 0,
                    posted_at: new Date(),
                    radio_program: {
                        id: 1,
                        radio_station_id: 1,
                        email: "taro00@example.org",
                        name: "ラジオ番組1",
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    program_corner: {
                        id: 1,
                        radio_program_id: 1,
                        name: 'コーナー1',
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    listener_id: 1,
                    radio_program_id: 2,
                    program_corner_id: 2,
                    listener_my_program: null,
                    listener_my_program_id: null,
                    my_program_corner: null,
                    my_program_corner_id: null,
                    radio_name: null,
                    subject: null,
                    content: "投稿2",
                    listener_info_flag: 0,
                    tel_flag: 0,
                    posted_at: new Date(),
                    radio_program: {
                        id: 2,
                        radio_station_id: 2,
                        email: "taro00@example.org",
                        name: "ラジオ番組2",
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    program_corner: {
                        id: 2,
                        radio_program_id: 2,
                        name: 'コーナー2',
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 3,
                    listener_id: 1,
                    radio_program_id: 3,
                    program_corner_id: 3,
                    listener_my_program: null,
                    listener_my_program_id: null,
                    my_program_corner: null,
                    my_program_corner_id: null,
                    radio_name: null,
                    subject: null,
                    content: "投稿3",
                    listener_info_flag: 0,
                    tel_flag: 0,
                    posted_at: new Date(),
                    radio_program: {
                        id: 3,
                        radio_station_id: 3,
                        email: "taro00@example.org",
                        name: "ラジオ番組3",
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    program_corner: {
                        id: 3,
                        radio_program_id: 3,
                        name: 'コーナー3',
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('投稿一覧', (() => {
    it('投稿が表示される', async () => {
        render(
            <Router>
                <Messages />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Messages');
        expect(await screen.findByText(/ラジオ番組1/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ番組2/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ番組3/)).toBeInTheDocument();
        expect(await screen.findByText(/コーナー1/)).toBeInTheDocument();
        expect(await screen.findByText(/コーナー2/)).toBeInTheDocument();
        expect(await screen.findByText(/コーナー3/)).toBeInTheDocument();
    })
}))
