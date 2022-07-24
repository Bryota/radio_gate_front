import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { RadioStations } from '../../features/radio_station';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-stations?page=1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            data: [
                {
                    id: 1,
                    name: 'ラジオ局1',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 2,
                    name: 'ラジオ局2',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 3,
                    name: 'ラジオ局3',
                    created_at: new Date(),
                    updated_at: new Date()
                },
            ]
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('ラジオ局一覧', (() => {
    it('ラジオ局一覧が表示される', async () => {
        render(
            <Router>
                <RadioStations />
            </Router>
        );
        expect(await screen.getByRole('heading')).toHaveTextContent('Radio Station');
        expect(await screen.findByText(/ラジオ局1/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ局2/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ局3/)).toBeInTheDocument();
    })
}))
