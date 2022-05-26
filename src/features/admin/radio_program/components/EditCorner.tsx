import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

export const AdminEditCorner = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="番組コーナー作成"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminInput
                            key='radio_station'
                            text='radio_station'
                            value='オードリーのオールナイトニッポン'
                            is_first_item={true}
                            is_disable={true}
                        />
                        <AdminInput
                            key='name'
                            value='死んでもやめんじゃねーぞ'
                            text='name'
                        />
                        <AdminButton
                            text='更新'
                            type='post'
                            click_action={click_handler}
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
