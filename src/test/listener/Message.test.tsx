import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { Message } from '../../features/message';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            content: 'テスト本文',
            radio_name: 'ハイキングベアー',
            subject: 'テスト件名',
            listener_info_flag: 1,
            tel_flag: 0,
            posted_at: new Date(),
            radio_program_id: 1,
            radio_program: {
                id: 1,
                radio_station_id: 1,
                name: 'ラジオ番組1',
                email: 'radio_program1@example.com',
                day: '月曜日',
                created_at: new Date(),
                updated_at: new Date(),
            },
            program_corner_id: 1,
            program_corner: {
                id: 1,
                radio_program_id: 1,
                name: 'コーナー1',
                created_at: new Date(),
                updated_at: new Date()
            },
            listener_my_program: null,
            listener_my_program_id: null,
            my_program_corner: null,
            my_program_corner_id: null,
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('投稿個別', (() => {
    it('個別の投稿が表示される', async () => {
        render(
            <Router>
                <Message />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Message');
        expect(await screen.findByText(/ラジオ番組1/)).toBeInTheDocument();
        expect(await screen.findByText(/コーナー1/)).toBeInTheDocument();
        // expect(await screen.findByText(/ハイキングベアー/)).toBeInTheDocument();
        expect(await screen.findByText(/テスト本文/)).toBeInTheDocument();
    })
}))
