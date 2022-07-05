import { RadioProgramType } from '../../../types/listener';

import '../../../assets/css/elements/radio.css';

export const MyRadioProgramList = ({ id, name }: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-7 font-25'>{name}</p>
                <a href={`/message_post?my_radio_program=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
                <a href={`/my_radio_program/${id}`} className='col-2 offset-1 btn list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
