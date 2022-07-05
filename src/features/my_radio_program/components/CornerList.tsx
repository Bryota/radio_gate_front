import '../../../assets/css/elements/radio.css';

import { CornerType } from '../../../types/listener';

export const CornerList = ({ id, programId, name }: CornerType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-10 font-25'>{name}</p>
                <a href={`/message_post?my_radio_program=${programId}&my_program_corner=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
            </div>
        </>
    )
}
