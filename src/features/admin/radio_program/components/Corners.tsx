import { ListType } from "../../../../types/admin";

export const Corners = ({ id, name, radio_program_id, is_first_item = false, click_action }: ListType) => {
    return (
        <>
            <div className={is_first_item ? 'row bg-white text-center align-items-center py-3 px-4' : 'row bg-white text-center align-items-center py-3 px-4 mt-3'}>
                <p className="col-8 row font-20">{name}</p>
                <a href={`/admin/radio_program/${radio_program_id}/corner/${id}/edit`} className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-accent color-white'>
                    編集
                </a>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-delete color-white' onClick={() => click_action(String(id))}>
                    削除
                </a>
            </div>
        </>
    )
}
