type RequestFunctionRequestListType = {
    id: number
    name: string
    post_date: string
}

export const AdminRequestFunctionRequestList = ({ id, name, post_date }: RequestFunctionRequestListType) => {

    return (
        <>
            <div className="row bg-white text-center align-items-center py-3 px-4 mt-3">
                <p className="col-5 row font-20">{name}</p>
                <p className="col-4 font-20">
                    {post_date}
                </p>
                <a href={`/admin/request_function_request/${id}`} className='col-1 text-center p-2 mx-1 list-btn bg-main'>
                    詳細
                </a>
            </div>
        </>
    )
}
