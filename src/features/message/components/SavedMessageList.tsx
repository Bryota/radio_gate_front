import { MessageListType } from '../../../types/listener';

export const SavedMessageList = ({ id, radioProgram, corner, postDate }: MessageListType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <div className="col-12 col-md-6 col-lg-7 row font-20 font-md-15">
                    <p>{radioProgram}</p>
                    <p>{corner}</p>
                </div>
                <a href={`/message_post?saved_message=${id}`} className='col-12 col-md-3 col-lg-2 text-center p-2 mx-md-4 mt-3 mt-md-0 list-btn bg-accent'>
                    コーナーを送る
                </a>
                <a href={`/saved_message/${id}`} className='col-12 col-md-2 col-lg-2 text-center p-2  mt-3 mt-md-0 list-btn bg-main'>
                    詳細
                </a>
            </div>
        </>
    )
}
