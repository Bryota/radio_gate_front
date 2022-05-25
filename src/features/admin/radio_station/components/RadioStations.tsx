import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminRadioStationList } from './RadioStationList';

export const AdminRadioStations = () => {

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
                        <AdminRadioStationList
                            title='ニッポン放送'
                            is_first_item={true}
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                        <AdminRadioStationList
                            title='ニッポン放送'
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
