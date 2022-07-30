import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { RequestFunction } from '../../features/request_function';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/request-functions/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            name: "機能リクエスト1",
            detail: "機能リクエスト詳細",
            is_open: 1
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('機能リクエスト個別', (() => {
    it('個別の機能リクエストが表示される', async () => {
        render(
            <Router>
                <RequestFunction />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Request Function');
        expect(await screen.findByText(/機能リクエスト1/)).toBeInTheDocument();
        expect(await screen.findByText(/機能リクエスト詳細/)).toBeInTheDocument();
    })
}))
