import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { CreateRequestFunctionRequest } from '../../features/request_function';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('機能リクエスト作成', (() => {
    it('機能リクエストが作成できる', async () => {
        render(
            <Router>
                <CreateRequestFunctionRequest />
            </Router>
        );

        const inputName: any = screen.getByTestId('request-function-request-input-name');
        const inputDetail: any = screen.getByTestId('request-function-request-input-detail');

        await userEvent.type(inputName, '機能リクエスト1');
        await userEvent.type(inputDetail, '機能リクエスト詳細1');
        expect(inputName.value).toBe("機能リクエスト1");
        expect(inputDetail.value).toBe("機能リクエスト詳細1");
        await userEvent.click(screen.getByRole('button'));
    })

    it('詳細を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateRequestFunctionRequest />
            </Router>
        )

        const inputName: any = screen.getByTestId('request-function-request-input-name');
        await userEvent.type(inputName, '機能リクエスト1');
        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('名前を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateRequestFunctionRequest />
            </Router>
        )

        const inputDetail: any = screen.getByTestId('request-function-request-input-detail');
        await userEvent.type(inputDetail, '機能リクエスト詳細1');
        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
