import '../../../assets/css/elements/radio.css';

import { CornerType } from '../../../types/listener';

export const CornerList = ({ id, name, programId }: CornerType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-9 font-25'>{name}</p>
                <a href={`/message_post?radio_program=${programId}&program_corner=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
            </div>
        </>
    )
}
