import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { Login } from '../../features/auth';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('ログイン', (() => {
    it('ログインできる', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        const inputEmail: any = screen.getByTestId('login-input-email');
        const inputPassword: any = screen.getByTestId('login-input-password');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.type(inputPassword, 'passwordpassword');
        expect(inputEmail.value).toBe("test@example.com");
        expect(inputPassword.value).toBe("passwordpassword");
        await userEvent.click(screen.getByRole('button'));
    })

    it('メールアドレスを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const inputPassword: any = screen.getByTestId('login-input-password');

        await userEvent.type(inputPassword, 'passwordpassword');
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('メールアドレスのフォーマットが異なっているとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('login-input-email');
        const inputPassword: any = screen.getByTestId('login-input-password');

        await userEvent.type(inputEmail, 'test');
        await userEvent.type(inputPassword, 'passwordpassword');
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/メールアドレスの形式が異なっています。/)).toBeInTheDocument();
    })

    it('パスワードを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('login-input-email');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
