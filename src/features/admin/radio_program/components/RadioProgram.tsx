import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';
import { AdminInput } from '../../../../components/Form/admin/Input';
import { Corners } from './Corners';

export const AdminRadioProgram = () => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <AdminMainLayout>
                <AdminPagehead
                    title="ラジオ番組"
                />
                <div className='row mt-5'>
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-9">
                        <div className='m-auto w-80'>
                            <span className="underline-green font-30">オードリーのオールナイトニッポン</span>
                        </div>
                        <div>
                            <AdminInput
                                key='radio_station'
                                text='radio_station'
                            />
                            <AdminInput
                                key='email'
                                text='email'
                            />
                        </div>
                        <div>
                            <div className="row m-auto w-80 mt-4 align-items-center">
                                <p className='col-3 font-30'>Corners</p>
                                <div className='col-5'>
                                    <a href="#" className='col-2 text-center py-2 px-5 rounded-0 list-btn bg-accent'>追加</a>
                                </div>
                            </div>
                            <div className="m-auto w-80">
                                <Corners
                                    title='死んでもやめんじゃねーぞ'
                                />
                                <Corners
                                    title='死んでもやめんじゃねーぞ'
                                />
                                <Corners
                                    title='死んでもやめんじゃねーぞ'
                                />
                            </div>
                        </div>
                        <AdminButton
                            text='ラジオ番組一覧'
                            type='get'
                            click_action={click_handler}
                        />
                    </div>
                </div>
            </AdminMainLayout>
        </>
    )
}
