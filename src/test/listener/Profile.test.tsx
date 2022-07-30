import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { Profile } from '../../features/listener';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            full_name: "名前性名前名",
            full_name_kana: "なまえせいなまえめい",
            radio_name: "ハイキングベアー",
            post_code: 1111111,
            address: "テスト県テスト市テスト1-1-10",
            tel: "00011112222",
            email: "test@example.com",
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('アカウント情報個別', (() => {
    it('個別のアカウント情報が表示される', async () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(await screen.getByRole('heading')).toHaveTextContent('Profile');
        expect(await screen.findByText(/名前性名前名/)).toBeInTheDocument();
        expect(await screen.findByText(/なまえせいなまえめい/)).toBeInTheDocument();
        expect(await screen.findByText(/ハイキングベアー/)).toBeInTheDocument();
        expect(await screen.findByText(/1111111/)).toBeInTheDocument();
        expect(await screen.findByText(/テスト県テスト市テスト1-1-10/)).toBeInTheDocument();
        expect(await screen.findByText(/00011112222/)).toBeInTheDocument();
        expect(await screen.findByText(/test@example.com/)).toBeInTheDocument();
    })
}))
