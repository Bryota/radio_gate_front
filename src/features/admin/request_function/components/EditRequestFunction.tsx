import axios from '../../../../settings/Axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AdminMainLayout } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminInput, AdminTextarea, AdminCheckBox } from '../../../../components/Form';

import { UrlParamsType } from '../../../../types/common';

export const AdminEditRequestFunction = () => {
    const urlParams = useParams<UrlParamsType>();
    const [name, setName] = useState<string>();
    const [detail, setDetail] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRequestFunction = async () => {
            try {
                const RequesetFunctionresponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request-functions/${urlParams.id}`);
                setName(RequesetFunctionresponse.data.request_function.name);
                setDetail(RequesetFunctionresponse.data.request_function.detail);
                setIsOpen(RequesetFunctionresponse.data.request_function.is_open);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRequestFunction();
    }, []);

    const click_handler = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/request-functions/${urlParams.id}`, {
                name: name,
                detail: detail,
                is_open: isOpen
            });
            navigation(`/admin/request_function/${urlParams.id}`);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="機能リクエスト編集"
                />
                <AdminInput
                    key='name'
                    text='name'
                    value={name}
                    changeAction={e => setName(e.target.value)}
                />
                <AdminTextarea
                    key='detail'
                    text='detail'
                    value={detail}
                    change_action={e => setDetail(e.target.value)}
                />
                <AdminCheckBox
                    label='is_open'
                    text='公開する'
                    checked={isOpen}
                    change_action={() => setIsOpen(!isOpen)}
                />
                <AdminButton
                    text='更新'
                    type='post'
                    click_action={click_handler}
                />
            </AdminMainLayout>
        </>
    )
}
