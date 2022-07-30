import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { MessageTemplate } from '../../features/message_template';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 51,
            name: "メッセージテンプレート1",
            content: "メッセージテンプレート本文"
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('メッセージテンプレート個別', (() => {
    it('個別のメッセージテンプレートが表示される', async () => {
        render(
            <Router>
                <MessageTemplate />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Message Template');
        expect(await screen.findByText(/メッセージテンプレート1/)).toBeInTheDocument();
        expect(await screen.findByText(/メッセージテンプレート本文/)).toBeInTheDocument();
    })
}))
