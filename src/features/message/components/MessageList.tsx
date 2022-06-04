type MessageListType = {
    id: number
    radio_program?: string
    corner?: string
    post_date: string
}

export const MessageList = ({ id, radio_program, corner, post_date }: MessageListType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <div className="col-7 row font-20">
                    <p>{radio_program}</p>
                    <p>{corner}</p>
                </div>
                <p className="col-3 font-20">
                    {post_date}
                </p>
                <a href={`/message/${id}`} className='col-2 text-center p-2 list-btn bg-main'>
                    詳細
                </a>
            </div>
        </>
    )
}
