import '../../../assets/css/elements/radio.css';

import { RadioProgramType } from '../../../types/listener';

export const RadioProgramList = ({ id, name }: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <div className='col-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-5 font-25'>{name}</p>
                <a href={`/message_post?radio_program=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
                <a href={`/radio_program/${id}`} className='col-2 offset-1 btn list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
