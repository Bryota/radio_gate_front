import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../settings/Axios';

import { MainLayout } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements/Button';
import { isAuthorized } from '../../../modules/auth/isAuthorized';

export const AccountDelete = () => {
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

    const deleteAccount = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener`)
                .then((res) => {
                    if (res.status === 200) {
                        return (
                            navigation('/login')
                        );
                    } else {
                        alert(res.data.message)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Account Delete"
                    subtitle='アカウント削除'
                />
                <div className='text-center mt-5 mb-4'>
                    <p className='h4'>アカウントを削除すると投稿履歴含め全ての情報が削除されます。</p>
                    <p className='h4'>お気をつけください。</p>
                </div>
                <Button
                    text='アカウント削除'
                    type='post'
                    clickAction={deleteAccount}
                />
            </MainLayout>
        </>
    )
}
