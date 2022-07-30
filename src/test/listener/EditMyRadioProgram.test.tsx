import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { EditMyRadioProgram } from '../../features/my_radio_program';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs/*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            name: "マイラジオ番組1",
            email: "test@example.com",
            my_program_corners: [
                {
                    id: 1,
                    listener_my_program_id: 1,
                    name: 'マイ番組コーナー1',
                    created_at: new Date(),
                    updated_at: new Date()
                },
            ],
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('マイラジオ番組個別', (() => {
    it('個別のマイラジオ番組が表示される', async () => {
        render(
            <Router>
                <EditMyRadioProgram />
            </Router>
        );

        const inputName: any = screen.getByTestId('my-radio-program-input-name');
        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');

        await waitFor(() => expect(inputName.value).toBe("マイラジオ番組1"));

        await userEvent.type(inputName, '更新');
        await userEvent.clear(inputEmail);
        await userEvent.type(inputEmail, 'test_update@example.com');

        expect(inputName.value).toBe("マイラジオ番組1更新");
        expect(inputEmail.value).toBe("test_update@example.com");

        waitFor(() => {
            const inputCorner: any = screen.getByTestId('my-radio-program-input-corner');
            expect(inputCorner.value).toBe("マイ番組コーナー1");
            userEvent.type(inputCorner, '更新');
            expect(inputCorner.value).toBe("マイ番組コーナー1更新");
        })
    })

    it('ラジオ番組名を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <EditMyRadioProgram />
            </Router>
        );

        const inputName: any = screen.getByTestId('my-radio-program-input-name');

        await waitFor(() => expect(inputName.value).toBe("マイラジオ番組1"));

        await userEvent.type(inputName, '更新');
        await userEvent.clear(inputName);
        await userEvent.click(screen.getByTestId('my-radio-program-button-edit'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('メールアドレスを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <EditMyRadioProgram />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');

        await waitFor(() => expect(inputEmail.value).toBe("test@example.com"));

        await userEvent.type(inputEmail, '更新');
        await userEvent.clear(inputEmail);
        await userEvent.click(screen.getByTestId('my-radio-program-button-edit'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('メールアドレスのフォーマットが異なっているとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <EditMyRadioProgram />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('my-radio-program-input-email');

        await waitFor(() => expect(inputEmail.value).toBe("test@example.com"));

        await userEvent.clear(inputEmail);
        await userEvent.type(inputEmail, 'test');
        await userEvent.click(screen.getByTestId('my-radio-program-button-edit'));
        expect(await screen.findByText(/メールアドレスの形式が異なっています。/)).toBeInTheDocument();
    })

    it('コーナーが空欄だとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <EditMyRadioProgram />
            </Router>
        );
        const inputName: any = screen.getByTestId('my-radio-program-input-name');
        await waitFor(() => expect(inputName.value).toBe("マイラジオ番組1"));

        waitFor(() => {
            const inputCorner: any = screen.getByTestId('my-radio-program-input-corner');
            expect(inputCorner.value).toBe("マイ番組コーナー1");
            userEvent.clear(inputCorner);
            userEvent.click(screen.getByTestId('my-radio-program-button-edit'));
            expect(screen.findByText(/必須項目です。/)).toBeInTheDocument();
        })
    })
}))
