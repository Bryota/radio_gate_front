import { MessageItemType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const MessageItem = ({ itemName, value }: MessageItemType): JSX.Element => {
    return (
        <>
            <div className='row mb-5'>
                <p className='mb-2 font-25 font-md-15'>{itemName}</p>
                <div className='px-4 py-3 font-20 inner-box'>
                    {value}
                </div>
            </div>
        </>
    )
}
