import axios from '../../../settings/Axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { Input, Textarea, Select } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';

import { validatedArrayType } from '../../../types/common';

export const Inquiry = () => {
    const [email, setEmail] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();
    const INQUERYTYPE = ['機能関連', '運営関連', 'その他'];

    useEffect(() => {
        authorized();
    }, []);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const validation = () => {
        const result = validationCheck(
            [
                {
                    key: 'email',
                    value: email,
                    type: 'require'
                },
                {
                    key: 'email',
                    value: email,
                    type: 'email'
                },
                {
                    key: 'email',
                    value: email,
                    type: 'max|150'
                },
                {
                    key: 'type',
                    value: type,
                    type: 'require'
                },
                {
                    key: 'content',
                    value: content,
                    type: 'require'
                },
                {
                    key: 'content',
                    value: content,
                    type: 'max|1500'
                },
            ]
        )
        if (result.length) {
            setValidationMessages(result);
            return true;
        } else {
            return false;
        }
    }

    const sendInquery = async () => {
        if (validation()) {
            return;
        }
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/inquery`, {
            email,
            type,
            content
        }).then(res => {
            if (res.status === 200) {
                navigation('/message_post', { state: { flash_message: 'お問い合わせを送信しました' } })
            } else {
                navigation('/message_post', { state: { flash_message: 'お問い合わせの送信に失敗しました' } })
            }
        });
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Inquery"
                    subtitle='お問い合わせ'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='メールアドレス'
                        value={email}
                        changeAction={e => setEmail(e.target.value)}
                        is_first_item={true}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                        data_testid='inquery-input-email'
                    />
                    <div className='row form-input_item'>
                        <div className='col-4'>
                            <label htmlFor='point'>問い合わせ種別</label>
                        </div>
                        <div className='col-8 position-relative'>
                            <select id='point' className='position-absolute w-100 border-0 underline-green' data-testid='inquery-input-type' defaultValue={''} onChange={e => setType(e.target.value)} >
                                <option hidden>選択してください</option>
                                <option value='機能関連'>機能関連</option>
                                <option value='運営関連'>運営関連</option>
                                <option value='その他'>その他</option>
                            </select>
                        </div>
                    </div>
                    <Textarea
                        key='content'
                        text='詳細'
                        changeAction={e => setContent(e.target.value)}
                        value={content}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'content')}
                        data_testid='inquery-input-content'
                    />
                </InnerBox>
                <Button
                    text='送信する'
                    type='post'
                    clickAction={sendInquery}
                />
            </MainLayout>
        </>
    )
}
