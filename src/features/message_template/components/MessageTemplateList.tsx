import { MessageTemplateType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const MessageTemplateList = ({ id, name }: MessageTemplateType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-12 col-md-9 font-25'>{name}</p>
                <a href={`/message_template/${id}`} className='col-12 col-md-2 mt-3 mt-md-0 btn bg-main list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
