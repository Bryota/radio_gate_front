import '../../../assets/css/radio.css';

type MessageListType = {
    radio_program: string
    corner: string
    post_date: string
}

export const MessageList = ({ radio_program, corner, post_date }: MessageListType): JSX.Element => {
    return (
        <>
            <div className='radio-item row align-items-center'>
                <div className="col-7 row message-radio_info">
                    <p>{radio_program}</p>
                    <p>{corner}</p>
                </div>
                <p className="col-3 message-post_date">
                    {post_date}
                </p>
                <a href="#" className='col-2 radio-btn element-btn-get message-show-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
