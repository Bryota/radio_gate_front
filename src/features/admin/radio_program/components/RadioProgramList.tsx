import { AdminMainLayout, AdminSidebar } from '../../../../components/Layout';
import { AdminPagehead } from '../../../../components/Pagehead';
import { AdminButton } from '../../../../components/Elements';

type RadioProgramListType = {
    id: number
    name: string
    is_first_item?: boolean
    click_action: (id: string) => void
}

export const AdminRadioProgramList = ({ id, name, is_first_item = false, click_action }: RadioProgramListType) => {
    return (
        <>
            <div className={is_first_item ? 'row bg-white text-center align-items-center py-3 px-4' : 'row bg-white text-center align-items-center py-3 px-4 mt-3'}>
                <p className="col-6 row font-20">{name}</p>
                <a href={`/admin/radio_program/${id}`} className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-main'>
                    詳細
                </a>
                <a href={`/admin/radio_program/${id}/edit`} className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-accent'>
                    編集
                </a>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-delete' onClick={() => click_action(String(id))}>
                    削除
                </a>
            </div>
        </>
    )
}
