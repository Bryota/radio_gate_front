import axios from '../../../settings/Axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { Input, Textarea } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { validationCheck } from '../../../modules/validation/validationCheck';

import { validatedArrayType } from '../../../types/common';

export const DeveloperContact = () => {
    const [email, setEmail] = useState<string>('');
    const [github, setGithub] = useState<string>('');
    const [languages, setLanguages] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validationMessages, setValidationMessages] = useState<validatedArrayType[]>([]);
    const navigation = useNavigate();

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
                    type: 'max|150'
                },
                {
                    key: 'github',
                    value: github,
                    type: 'max|100'
                },
                {
                    key: 'languages',
                    value: languages,
                    type: 'max|100'
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

    const sendDeveloperContact = async () => {
        if (validation()) {
            return;
        }
        await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/developer-contact`, {
            email,
            github,
            languages,
            content
        }).then(res => {
            if (res.status === 200) {
                console.log(res)
                navigation('/developer_contact', { state: { flash_message: '?????????????????????????????????????????????' } })
            } else {
                navigation('/developer_contact', { state: { flash_message: '??????????????????????????????????????????????????????' } })
            }
        });
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Developer Contact"
                    subtitle='????????????????????????'
                />
                <InnerBox>
                    <Input
                        key='email'
                        text='?????????????????????'
                        changeAction={e => setEmail(e.target.value)}
                        is_first_item={true}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'email')}
                    />
                    <Input
                        key='github'
                        text='GitHub???????????????'
                        changeAction={e => setGithub(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'github')}
                    />
                    <Input
                        key='languages'
                        text='???????????????'
                        changeAction={e => setLanguages(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'languages')}
                    />
                    <Textarea
                        key='content'
                        text='?????????'
                        changeAction={e => setContent(e.target.value)}
                        validationMessages={validationMessages.filter(validationMessage => validationMessage.key === 'content')}
                    />
                </InnerBox>
                <Button
                    text='????????????'
                    type='post'
                    clickAction={sendDeveloperContact}
                />
            </MainLayout>
        </>
    )
}
