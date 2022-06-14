type RequestFunctionRequestListType = {
    id: number
    name: string
    post_date: string
    click_action: (id: string) => void
}

export const AdminRequestFunctionRequestList = ({ id, name, post_date, click_action }: RequestFunctionRequestListType) => {

    return (
        <>
            <div className="row bg-white text-center align-items-center py-3 px-4 mt-3">
                <p className="col-6 row font-20">{name}</p>
                <p className="col-4 font-20">
                    {post_date}
                </p>
                <a href={`/admin/request_function_request/${id}`} className='col-1 text-center p-2 mx-1 list-btn bg-main'>
                    詳細
                </a>
                <p className='col-1 text-center p-2 mx-1 list-btn bg-post cursor-pointer' onClick={() => click_action(String(id))}>
                    非公開
                </p>
            </div>
        </>
    )
}
