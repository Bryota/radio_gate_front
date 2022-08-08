import '../../../assets/css/elements/radio.css';

import { CornerType } from '../../../types/listener';

export const CornerList = ({ id, name, programId }: CornerType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-lg-9 col-md-8 font-25'>{name}</p>
                <a href={`/message_post?radio_program=${programId}&program_corner=${id}`} className='col-lg-2 col-md-3 mt-3 mt-md-0  btn bg-main list-btn'>
                    メールを送る
                </a>
            </div>
        </>
    )
}
