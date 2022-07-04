import axios from '../../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

export const AdminCreateRadioStation = () => {
    const [name, setName] = useState<string>();
    const navigation = useNavigate();

    const click_handler = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/admin/radio-stations`, {
                name,
            });
            navigation('/admin/radio_stations')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ局作成"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminInput
                            key='name'
                            text='name'
                            is_first_item={true}
                            change_action={e => setName(e.target.value)}
                        />
                        <AdminButton
                            text='作成'
                            type='post'
                            click_action={click_handler}
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
