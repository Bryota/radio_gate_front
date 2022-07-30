import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { VoteRequestFunction } from '../../features/request_function';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('機能リクエスト投票', (() => {
    it('機能リクエストに投票できる', async () => {
        render(
            <Router>
                <VoteRequestFunction />
            </Router>
        );

        const inputVote: any = screen.getByTestId('request-function-vote');

        await userEvent.selectOptions(inputVote, ['1']);
        expect(inputVote.value).toBe("1");
    })

    it('ポイントを選択しないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <VoteRequestFunction />
            </Router>
        )

        await userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
