import { ListType } from '../../../../types/admin/';

export const AdminRadioStationList = ({ id, name, is_first_item = false, click_action }: ListType) => {
    return (
        <>
            <div className={is_first_item ? 'row bg-white text-center align-items-center py-3 px-4' : 'row bg-white text-center align-items-center py-3 px-4 mt-3'}>
                <p className="col-6 row font-20">{name}</p>
                <a href={`/admin/radio_programs/${id}`} className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-main'>
                    番組一覧
                </a>
                <a href={`/admin/radio_station/${id}/edit`} className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-accent'>
                    編集
                </a>
                <p className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-delete cursor-pointer' onClick={() => click_action(String(id))}>
                    削除
                </p>
            </div>
        </>
    )
}
