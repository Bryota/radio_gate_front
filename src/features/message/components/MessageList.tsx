import { MessageListType } from '../../../types/listener';

import Moment from 'react-moment';

export const MessageList = ({ id, radioProgram, corner, postDate }: MessageListType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <div className="col-12 col-md-6 row font-20">
                    <p>{radioProgram}</p>
                    <p>{corner}</p>
                </div>
                <p className="col-12 col-md-4 mt-3 mt-md-0 font-20">
                    <Moment format='YYYY年MM月DD日 HH時mm分'>
                        {postDate}
                    </Moment>
                </p>
                <a href={`/message/${id}`} className='col-12 col-md-2 mt-3 mt-md-0 text-center p-2 list-btn bg-main'>
                    詳細
                </a>
            </div>
        </>
    )
}
