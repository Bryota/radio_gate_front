import '../../../assets/css/elements/radio.css';

import { RadioProgramType } from '../../../types/listener';

export const SelectedRadioProgram = ({ id, name, email }: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row underline-green p-1rem">
                    <p className='col-9 font-40'>{name}</p>
                    <a href={`/message_post?radio_program=${id}`} className='col-2 btn bg-main list-btn'>
                        メールを送る
                    </a>
                </div>
                <p className='mt-2 ps-3 font-20'>{email}</p>
            </div>
        </>
    )
}
