import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { CreateMessageTemplate } from '../../features/message_template';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('メッセージテンプレート作成', (() => {
    it('メッセージテンプレートが作成できる', async () => {
        render(
            <Router>
                <CreateMessageTemplate />
            </Router>
        );
        const inputName: any = screen.getByTestId('message-template-input-name');
        const inputContent: any = screen.getByTestId('message-template-input-content');

        await userEvent.type(inputName, 'メッセージテンプレート作成1');
        await userEvent.type(inputContent, 'メッセージテンプレート本文1');
        expect(inputName.value).toBe("メッセージテンプレート作成1");
        expect(inputContent.value).toBe("メッセージテンプレート本文1");
        await userEvent.click(screen.getByRole('button'));
    })

    it('本文を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateMessageTemplate />
            </Router>
        );
        const inputName: any = screen.getByTestId('message-template-input-name');

        await userEvent.type(inputName, 'メッセージテンプレート作成1');
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('名前を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateMessageTemplate />
            </Router>
        );
        const inputContent: any = screen.getByTestId('message-template-input-content');

        await userEvent.type(inputContent, 'メッセージテンプレート本文1');
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
