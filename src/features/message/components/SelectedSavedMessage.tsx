import { SelectedMessageType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const SelectedSavedMessage = ({ id, name }: SelectedMessageType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row underline-green p-1rem">
                    <p className='col-9 font-40'>{name}</p>
                    <a href={`/message_post?saved_message=${id}`} className='col-2 btn bg-accent list-btn'>
                        メールを送る
                    </a>
                </div>
            </div>
        </>
    )
}
