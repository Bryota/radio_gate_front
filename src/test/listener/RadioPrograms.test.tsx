import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { RadioPrograms } from '../../features/radio_program';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-station/:radio_station_id/name`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            radio_station_name: 'ラジオ局1'
        }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs?page=1&radio_station=1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            radio_station_name: 'ラジオ局1',
            radio_programs: {
                data: [
                    {
                        id: 1,
                        name: 'ラジオ番組1',
                        email: 'test1@example.com',
                        radio_station_id: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    {
                        id: 2,
                        name: 'ラジオ番組2',
                        email: 'test2@example.com',
                        radio_station_id: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    {
                        id: 3,
                        name: 'ラジオ番組3',
                        email: 'test3@example.com',
                        radio_station_id: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                ]
            }
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('ラジオ番組一覧', (() => {
    it('ラジオ番組一覧が表示される', async () => {
        render(
            <Router>
                <RadioPrograms />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Radio Program');
        expect(await screen.findByText(/ラジオ局1/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ番組1/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ番組2/)).toBeInTheDocument();
        expect(await screen.findByText(/ラジオ番組3/)).toBeInTheDocument();
    })
}))
