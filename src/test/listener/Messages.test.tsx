import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { MyRadioPrograms } from '../../features/my_radio_program';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs?page=1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            listener_my_programs: {
                data: [
                    {
                        id: 1,
                        name: 'マイラジオ番組1',
                        email: 'test1@example.com',
                        radio_station_id: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    {
                        id: 2,
                        name: 'マイラジオ番組2',
                        email: 'test2@example.com',
                        radio_station_id: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                    {
                        id: 3,
                        name: 'マイラジオ番組3',
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

describe('マイラジオ番組一覧', (() => {
    it('マイラジオ番組一覧が表示される', async () => {
        render(
            <Router>
                <MyRadioPrograms />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('My Radio Programs');
        expect(await screen.findByText(/マイラジオ番組1/)).toBeInTheDocument();
        expect(await screen.findByText(/マイラジオ番組2/)).toBeInTheDocument();
        expect(await screen.findByText(/マイラジオ番組3/)).toBeInTheDocument();
    })
}))
