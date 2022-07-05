import { MessageListType } from '../../../types/listener';

export const SavedMessageList = ({ id, radioProgram, corner, postDate }: MessageListType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <div className="col-7 row font-20">
                    <p>{radioProgram}</p>
                    <p>{corner}</p>
                </div>
                <a href={`/message_post?saved_message=${id}`} className='col-2 text-center p-2 mx-4 list-btn bg-accent'>
                    コーナーを送る
                </a>
                <a href={`/saved_message/${id}`} className='col-2 text-center p-2 list-btn bg-main'>
                    詳細
                </a>
            </div>
        </>
    )
}
