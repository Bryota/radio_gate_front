import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';

type RadioStationListType = {
    title: string
    is_first_item?: boolean
}

export const AdminRadioStationList = ({ title, is_first_item = false }: RadioStationListType) => {

    const click_handler = () => {
        return '';
    }
    return (
        <>
            <div className={is_first_item ? 'row bg-white text-center align-items-center py-3 px-4' : 'row bg-white text-center align-items-center py-3 px-4 mt-3'}>
                <p className="col-6 row font-20">{title}</p>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-main'>
                    詳細
                </a>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-accent'>
                    編集
                </a>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-delete'>
                    削除
                </a>
            </div>
        </>
    )
}
