import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRadioProgramList } from './RadioProgramList';

export const AdminRadioPrograms = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ局一覧"
                />
                <AdminButton
                    text='追加'
                    type='post'
                    line_left={true}
                    click_action={click_handler}
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-8">
                        <AdminRadioProgramList
                            title='オードリーのオールナイトニッポン'
                            is_first_item={true}
                        />
                        <AdminRadioProgramList
                            title='オードリーのオールナイトニッポン'
                        />
                        <AdminRadioProgramList
                            title='オードリーのオールナイトニッポン'
                        />
                        <AdminRadioProgramList
                            title='オードリーのオールナイトニッポン'
                        />
                        <AdminRadioProgramList
                            title='オードリーのオールナイトニッポン'
                        />
                        <AdminRadioProgramList
                            title='オードリーのオールナイトニッポン'
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
