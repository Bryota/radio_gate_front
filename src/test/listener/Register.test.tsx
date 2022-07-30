import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";
import { Register } from '../../features/auth';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('新規登録', (() => {
    it('新規登録できる', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        const inputEmail: any = screen.getByTestId('register-input-email');
        const inputPassword: any = screen.getByTestId('register-input-password');
        const inputLastName: any = screen.getByTestId('register-input-last-name');
        const inputFirstName: any = screen.getByTestId('register-input-first-name');
        const inputLastNameKana: any = screen.getByTestId('register-input-last-name-kana');
        const inputFirstNameKana: any = screen.getByTestId('register-input-first-name-kana');
        const inputRadioName: any = screen.getByTestId('register-input-radio-name');
        const inputPostCode: any = screen.getByTestId('register-input-post-code');
        const inputPrefecture: any = screen.getByTestId('register-input-prefecture');
        const inputCity: any = screen.getByTestId('register-input-city');
        const inputHouseNumber: any = screen.getByTestId('register-input-house-number');
        const inputBuilding: any = screen.getByTestId('register-input-building');
        const inputRoomNumber: any = screen.getByTestId('register-input-room-number');
        const inputTel: any = screen.getByTestId('register-input-tel');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.type(inputPassword, 'passwordpassword');
        await userEvent.type(inputLastName, 'テスト姓');
        await userEvent.type(inputFirstName, 'テスト名');
        await userEvent.type(inputLastNameKana, 'てすとせい');
        await userEvent.type(inputFirstNameKana, 'てすとめい');
        await userEvent.type(inputRadioName, 'ハイキングベアー');
        await userEvent.type(inputPostCode, '1111111');
        await userEvent.type(inputPrefecture, '東京都');
        await userEvent.type(inputCity, 'テスト市');
        await userEvent.type(inputHouseNumber, '1-1-1');
        await userEvent.type(inputBuilding, 'テスト建物');
        await userEvent.type(inputRoomNumber, '100');
        await userEvent.type(inputTel, '000-1111-2222');

        expect(inputEmail.value).toBe("test@example.com");
        expect(inputPassword.value).toBe("passwordpassword");
        expect(inputLastName.value).toBe("テスト姓");
        expect(inputFirstName.value).toBe("テスト名");
        expect(inputLastNameKana.value).toBe("てすとせい");
        expect(inputFirstNameKana.value).toBe("てすとめい");
        expect(inputRadioName.value).toBe("ハイキングベアー");
        expect(inputPostCode.value).toBe("1111111");
        expect(inputPrefecture.value).toBe("東京都");
        expect(inputCity.value).toBe("テスト市");
        expect(inputHouseNumber.value).toBe("1-1-1");
        expect(inputBuilding.value).toBe("テスト建物");
        expect(inputRoomNumber.value).toBe("100");
        expect(inputTel.value).toBe("000-1111-2222");
    })

    it('メールアドレスを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        const inputPassword: any = screen.getByTestId('register-input-password');

        await userEvent.type(inputPassword, 'passwordpassword');
        await userEvent.click(screen.getByTestId('register-button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('メールアドレスのフォーマットが異なっているとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('register-input-email');
        const inputPassword: any = screen.getByTestId('register-input-password');

        await userEvent.type(inputEmail, 'test');
        await userEvent.type(inputPassword, 'passwordpassword');
        await userEvent.click(screen.getByTestId('register-button'));
        expect(await screen.findByText(/メールアドレスの形式が異なっています。/)).toBeInTheDocument();
    })

    it('パスワードを入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        const inputEmail: any = screen.getByTestId('register-input-email');

        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.click(screen.getByTestId('register-button'));
        expect(await screen.findByText(/必須項目です。/)).toBeInTheDocument();
    })

    it('郵便番号で数値を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        const inputPostCode: any = screen.getByTestId('register-input-post-code');

        await userEvent.type(inputPostCode, 'test');
        await userEvent.click(screen.getByTestId('register-button'));
        expect(await screen.findByText(/数値で入力してください。/)).toBeInTheDocument();
    })
}))
