import '../../../assets/css/elements/radio.css';

import { RadioProgramType } from '../../../types/listener';

export const SelectedRadioProgram = ({ id, name, email }: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='mb-4 mb-md-5'>
                <div className="row underline-green p-1rem align-items-center">
                    <p className='col-5 col-md-9 font-40 font-md-30'>{name}</p>
                    <a href={`/message_post?radio_program=${id}`} className='col-7 col-md-3 btn bg-main list-btn'>
                        メールを送る
                    </a>
                </div>
                <p className='mt-2 ps-3 font-20'>{email}</p>
            </div>
        </>
    )
}
