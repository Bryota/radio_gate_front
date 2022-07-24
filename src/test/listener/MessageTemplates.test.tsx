import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { MessageTemplates } from '../../features/message_template';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates?page=1`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            data: [
                {
                    id: 1,
                    name: 'メッセージテンプレート1',
                    listener_id: 1,
                    content: '本文1',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 2,
                    name: 'メッセージテンプレート2',
                    listener_id: 1,
                    content: '本文2',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 3,
                    name: 'メッセージテンプレート3',
                    listener_id: 1,
                    content: '本文3',
                    created_at: new Date(),
                    updated_at: new Date()
                },
            ]
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('メッセージテンプレート一覧', (() => {
    it('メッセージテンプレート一覧が表示される', async () => {
        render(
            <Router>
                <MessageTemplates />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Message Templates');
        expect(await screen.findByText(/メッセージテンプレート1/)).toBeInTheDocument();
        expect(await screen.findByText(/メッセージテンプレート2/)).toBeInTheDocument();
        expect(await screen.findByText(/メッセージテンプレート3/)).toBeInTheDocument();
    })
}))
