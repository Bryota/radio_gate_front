import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { ProfileEdit } from '../../features/listener';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'success' }));
    }),
    rest.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            id: 1,
            last_name: "テスト姓",
            first_name: "テスト名",
            last_name_kana: "てすとせい",
            first_name_kana: "てすとめい",
            radio_name: "ハイキングベアー",
            post_code: 1111111,
            prefecture: "東京都",
            city: "テスト市",
            house_number: "テスト町11",
            building: "テスト建物",
            room_number: "11",
            tel: "00011112222"
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers() });

describe('アカウント情報編集', (() => {
    it('アカウント情報が編集できる', async () => {
        render(
            <Router>
                <ProfileEdit />
            </Router>
        );

        const inputLastName: any = screen.getByTestId('profile-input-last-name');
        const inputFirstName: any = screen.getByTestId('profile-input-first-name');
        const inputLastNameKana: any = screen.getByTestId('profile-input-last-name-kana');
        const inputFirstNameKana: any = screen.getByTestId('profile-input-first-name-kana');
        const inputRadioName: any = screen.getByTestId('profile-input-radio-name');
        const inputPostCode: any = screen.getByTestId('profile-input-post-code');
        const inputPrefecture: any = screen.getByTestId('profile-input-prefecture');
        const inputCity: any = screen.getByTestId('profile-input-city');
        const inputHouseNumber: any = screen.getByTestId('profile-input-house-number');
        const inputBuilding: any = screen.getByTestId('profile-input-building');
        const inputRoomNumber: any = screen.getByTestId('profile-input-room-number');
        const inputTel: any = screen.getByTestId('profile-input-tel');

        await waitFor(() => expect(inputLastName.value).toBe("テスト姓"));

        await userEvent.type(inputLastName, '更新');
        await userEvent.type(inputFirstName, '更新');
        await userEvent.type(inputLastNameKana, 'こうしん');
        await userEvent.type(inputFirstNameKana, 'こうしん');
        await userEvent.type(inputRadioName, '更新');
        await userEvent.type(inputPostCode, '00');
        await userEvent.type(inputPrefecture, '更新');
        await userEvent.type(inputCity, '更新');
        await userEvent.type(inputHouseNumber, '更新');
        await userEvent.type(inputBuilding, '更新');
        await userEvent.type(inputRoomNumber, '00');
        await userEvent.type(inputTel, '00');

        expect(inputLastName.value).toBe("テスト姓更新");
        expect(inputFirstName.value).toBe("テスト名更新");
        expect(inputLastNameKana.value).toBe("てすとせいこうしん");
        expect(inputFirstNameKana.value).toBe("てすとめいこうしん");
        expect(inputRadioName.value).toBe("ハイキングベアー更新");
        expect(inputPostCode.value).toBe("111111100");
        expect(inputPrefecture.value).toBe("東京都更新");
        expect(inputCity.value).toBe("テスト市更新");
        expect(inputHouseNumber.value).toBe("テスト町11更新");
        expect(inputBuilding.value).toBe("テスト建物更新");
        expect(inputRoomNumber.value).toBe("1100");
        expect(inputTel.value).toBe("0001111222200");
    })

    it('郵便番号で数値を入れないとバリデーションメッセージが表示される', async () => {
        render(
            <Router>
                <ProfileEdit />
            </Router>
        );
        const inputPostCode: any = screen.getByTestId('profile-input-post-code');
        await waitFor(() => expect(inputPostCode.value).toBe("1111111"));

        await userEvent.type(inputPostCode, 'test');
        await userEvent.click(screen.getByTestId('profile-button-edit'));
        expect(await screen.findByText(/数値で入力してください。/)).toBeInTheDocument();
    })
}))
