import '../../../assets/css/elements/radio.css';

import { RadioProgramType } from '../../../types/listener';

export const SelectedMyRadioProgram = ({ id, name, email }: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row underline-green p-1rem">
                    <p className='col-7 font-40'>{name}</p>
                    <a href={`/message_post?my_radio_program=${id}`} className='col-2 btn bg-main list-btn'>
                        メールを送る
                    </a>
                    <a href={`/my_radio_program/${id}/edit`} className='col-2 offset-1 btn list-btn'>
                        編集
                    </a>
                </div>
                <p className='mt-2 ps-3 font-20'>{email}</p>
            </div>
        </>
    )
}
