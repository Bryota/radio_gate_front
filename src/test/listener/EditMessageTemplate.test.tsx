import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { EditMessageTemplate } from '../../features/message_template';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            name: "メッセージテンプレート1",
            content: "メッセージテンプレート本文"
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('メッセージテンプレート更新', (() => {
    it('メッセージテンプレートが更新できる', async () => {
        render(
            <Router>
                <EditMessageTemplate />
            </Router>
        );
        const inputName: any = screen.getByTestId('message-template-input-name');
        const inputContent: any = screen.getByTestId('message-template-input-content');

        await waitFor(() => expect(inputName.value).toBe("メッセージテンプレート1"));
        expect(await screen.findByText(/メッセージテンプレート本文/)).toBeInTheDocument();
        await userEvent.type(inputName, '更新');
        await userEvent.type(inputContent, '更新');
        expect(inputName.value).toBe("メッセージテンプレート1更新");
        expect(inputContent.value).toBe("メッセージテンプレート本文更新");
        await userEvent.click(screen.getByRole('button'));
    })

    it('テンプレート名を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <EditMessageTemplate />
            </Router>
        );
        const inputName: any = screen.getByTestId('message-template-input-name');

        await waitFor(() => expect(inputName.value).toBe("メッセージテンプレート1"));
        await userEvent.type(inputName, '更新');
        await userEvent.clear(inputName);
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('本文を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <EditMessageTemplate />
            </Router>
        );
        const inputContent: any = screen.getByTestId('message-template-input-content');

        await waitFor(() => expect(inputContent.value).toBe("メッセージテンプレート本文"));
        await userEvent.type(inputContent, '更新');
        await userEvent.clear(inputContent);
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
