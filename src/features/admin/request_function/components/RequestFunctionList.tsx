type RequestFunctionListType = {
    title: string
    post_date: string
}

export const AdminRequestFunctionList = ({ title, post_date }: RequestFunctionListType) => {

    return (
        <>
            <div className="row bg-white text-center align-items-center py-3 px-4 mt-3">
                <p className="col-5 row font-20">{title}</p>
                <p className="col-4 font-20">
                    {post_date}
                </p>
                <a href="#" className='col-1 text-center p-2 mx-1 list-btn bg-main'>
                    詳細
                </a>
                <a href="#" className='col-1 text-center p-2 mx-1 list-btn bg-accent'>
                    編集
                </a>
                <a href="#" className='col-1 text-center p-2 mx-1 list-btn bg-delete'>
                    削除
                </a>
            </div>
        </>
    )
}
