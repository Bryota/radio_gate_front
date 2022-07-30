import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { CreateMyRadioProgram } from '../../features/my_radio_program';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('マイラジオ番組作成', (() => {
    it('マイラジオ番組が作成できる', async () => {
        render(
            <Router>
                <CreateMyRadioProgram />
            </Router>
        );
        const inputName: any = screen.getByTestId('my-radio-program-input-name');
        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');
        await userEvent.type(inputName, 'マイラジオ番組1');
        await userEvent.type(inputEmail, 'test@example.com');

        await userEvent.click(screen.getByTestId('my-radio-program-button-add-corner'));
        const inputCorner: any = screen.getByTestId('my-radio-program-input-corner');
        await userEvent.type(inputCorner, 'コーナー1');

        expect(inputName.value).toBe("マイラジオ番組1");
        expect(inputEmail.value).toBe("test@example.com");
        expect(inputCorner.value).toBe("コーナー1");
    })

    it('メールアドレスを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateMyRadioProgram />
            </Router>
        );
        const inputName: any = screen.getByTestId('my-radio-program-input-name');

        await userEvent.type(inputName, 'マイラジオ番組1');
        await userEvent.click(screen.getByTestId('my-radio-program-button-create'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('メールアドレスのフォーマットが異なっているとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateMyRadioProgram />
            </Router>
        );
        const inputName: any = screen.getByTestId('my-radio-program-input-name');
        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');
        await userEvent.type(inputName, 'マイラジオ番組1');
        await userEvent.type(inputEmail, 'test');

        await userEvent.click(screen.getByTestId('my-radio-program-button-create'));
        expect(await screen.findByText(/メールアドレスの形式が異なっています。/)).toBeInTheDocument();
    })

    it('ラジオ番組名を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateMyRadioProgram />
            </Router>
        );
        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');
        await userEvent.type(inputEmail, 'test@example.com');

        await userEvent.click(screen.getByTestId('my-radio-program-button-create'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('コーナーが空欄だとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <CreateMyRadioProgram />
            </Router>
        );
        const inputName: any = screen.getByTestId('my-radio-program-input-name');
        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');
        await userEvent.type(inputName, 'マイラジオ番組1');
        await userEvent.type(inputEmail, 'test@example.com');

        await userEvent.click(screen.getByTestId('my-radio-program-button-add-corner'));

        await userEvent.click(screen.getByTestId('my-radio-program-button-create'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })
}))
