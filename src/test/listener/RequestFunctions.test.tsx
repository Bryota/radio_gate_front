import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { RequestFunctions } from '../../features/request_function';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions?page=1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            data: [
                {
                    id: 1,
                    name: '機能リクエスト1',
                    point: 1,
                    is_voted: false,
                },
                {
                    id: 2,
                    name: '機能リクエスト2',
                    point: 1,
                    is_voted: false,
                },
                {
                    id: 3,
                    name: '機能リクエスト3',
                    point: 1,
                    is_voted: false,
                },
            ]
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('機能リクエスト一覧', (() => {
    it('機能リクエスト一覧が表示される', async () => {
        render(
            <Router>
                <RequestFunctions />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Request Functions');
        expect(await screen.findByText(/機能リクエスト1/)).toBeInTheDocument();
        expect(await screen.findByText(/機能リクエスト2/)).toBeInTheDocument();
        expect(await screen.findByText(/機能リクエスト3/)).toBeInTheDocument();
    })
}))
