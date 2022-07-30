import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { MyRadioProgram } from '../../features/my_radio_program';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            name: "マイラジオ番組1",
            email: "test@example.com",
            my_program_corners: [
                {
                    id: 1,
                    listener_my_program_id: 1,
                    name: 'マイ番組コーナー1',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 2,
                    listener_my_program_id: 1,
                    name: 'マイ番組コーナー2',
                    created_at: new Date(),
                    updated_at: new Date()
                },
            ],
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('マイラジオ番組個別', (() => {
    it('個別のマイラジオ番組が表示される', async () => {
        render(
            <Router>
                <MyRadioProgram />
            </Router>
        );

        expect(await screen.getByTestId('page-head')).toHaveTextContent('My Radio Program');
        expect(await screen.findByText(/マイラジオ番組1/)).toBeInTheDocument();
        expect(await screen.findByText(/マイ番組コーナー1/)).toBeInTheDocument();
        expect(await screen.findByText(/マイ番組コーナー2/)).toBeInTheDocument();
    })
}))
