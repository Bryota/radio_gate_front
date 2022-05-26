type CornerListType = {
    title: string
    is_first_item?: boolean
}

export const Corners = ({ title, is_first_item = false }: CornerListType) => {
    return (
        <>
            <div className={is_first_item ? 'row bg-white text-center align-items-center py-3 px-4' : 'row bg-white text-center align-items-center py-3 px-4 mt-3'}>
                <p className="col-6 row font-20">{title}</p>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-main color-white'>
                    詳細
                </a>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-accent color-white'>
                    編集
                </a>
                <a href="#" className='col-2 text-center p-2 mx-1 rounded-0 list-btn bg-delete color-white'>
                    削除
                </a>
            </div>
        </>
    )
}
