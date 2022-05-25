import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements/admin/Button';
import { AdminInput } from '../../../../components/Form/admin/Input';

export const AdminEditRadioProgram = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ局編集"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminInput
                            key='radio_station'
                            text='radio_station'
                            value='ニッポン放送'
                            is_first_item={true}
                        />
                        <AdminInput
                            key='name'
                            text='name'
                            value='オードリーのオールナイトニッポン'
                        />
                        <AdminInput
                            key='email'
                            text='email'
                            value='test@example.com'
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
