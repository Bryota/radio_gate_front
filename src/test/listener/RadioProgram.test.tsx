import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { RadioProgram } from '../../features/radio_program';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            email: "test_radio_program@example.com",
            name: "ラジオ番組1",
            program_corners: [
                {
                    id: 1,
                    name: "コーナー1",
                    radio_program_id: 1,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 2,
                    name: "コーナー2",
                    radio_program_id: 1,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('ラジオ番組個別', (() => {
    it('個別のラジオ番組が表示される', async () => {
        render(
            <Router>
                <RadioProgram />
            </Router>
        );

        expect(screen.getByTestId('page-head')).toHaveTextContent('Radio Program');
        expect(await screen.findByText(/ラジオ番組1/)).toBeInTheDocument();
        expect(await screen.findByText(/test_radio_program@example.com/)).toBeInTheDocument();
        expect(await screen.findByText(/コーナー1/)).toBeInTheDocument();
        expect(await screen.findByText(/コーナー2/)).toBeInTheDocument();
    })
}))
