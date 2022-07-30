import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { Inquiry } from '../../features/static';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('お問い合わせ', (() => {
    it('お問い合わせを送信できる', async () => {
        render(
            <Router>
                <Inquiry />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('inquery-input-email');
        const inputType: any = screen.getByTestId('inquery-input-type');
        const inputContent: any = screen.getByTestId('inquery-input-content');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.type(inputType, '機能に関する質問');
        await userEvent.type(inputContent, 'お問い合わせ本文');
        expect(inputEmail.value).toBe("test@example.com");
        expect(inputType.value).toBe("機能に関する質問");
        expect(inputContent.value).toBe("お問い合わせ本文");
        await userEvent.click(screen.getByRole('button'));
    })

    it('メールアドレスを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Inquiry />
            </Router>
        )

        const inputType: any = screen.getByTestId('inquery-input-type');
        const inputContent: any = screen.getByTestId('inquery-input-content');
        await userEvent.type(inputType, '機能に関する質問');
        await userEvent.type(inputContent, 'お問い合わせ本文');
        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('メールアドレスのフォーマットが異なっているとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Inquiry />
            </Router>
        )

        const inputEmail: any = screen.getByTestId('inquery-input-email');
        const inputType: any = screen.getByTestId('inquery-input-type');
        const inputContent: any = screen.getByTestId('inquery-input-content');

        await userEvent.type(inputEmail, 'test');
        await userEvent.type(inputType, '機能に関する質問');
        await userEvent.type(inputContent, 'お問い合わせ本文');
        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/メールアドレスの形式が異なっています。/)).toBeInTheDocument();
    })

    it('問い合わせ種別を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Inquiry />
            </Router>
        )

        const inputEmail: any = screen.getByTestId('inquery-input-email');
        const inputContent: any = screen.getByTestId('inquery-input-content');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.type(inputContent, 'お問い合わせ本文');
        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('詳細を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Inquiry />
            </Router>
        )

        const inputEmail: any = screen.getByTestId('inquery-input-email');
        const inputType: any = screen.getByTestId('inquery-input-type');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.type(inputType, '機能に関する質問');
        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
