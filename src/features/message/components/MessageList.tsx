import Moment from 'react-moment';

type MessageListType = {
    id: number
    radioProgram?: string
    corner?: string
    postDate: string
}

export const MessageList = ({ id, radioProgram, corner, postDate }: MessageListType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <div className="col-6 row font-20">
                    <p>{radioProgram}</p>
                    <p>{corner}</p>
                </div>
                <p className="col-4 font-20">
                    <Moment format='YYYY年MM月DD日 hh時mm分'>
                        {postDate}
                    </Moment>
                </p>
                <a href={`/message/${id}`} className='col-2 text-center p-2 list-btn bg-main'>
                    詳細
                </a>
            </div>
        </>
    )
}
