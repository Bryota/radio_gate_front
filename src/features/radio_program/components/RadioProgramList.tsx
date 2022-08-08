import '../../../assets/css/elements/radio.css';

import { RadioProgramType } from '../../../types/listener';

export const RadioProgramList = ({ id, name }: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <div className='col-md-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-lg-5 col-md-4 font-25'>{name}</p>
                <a href={`/message_post?radio_program=${id}`} className='col-lg-2 col-md-3 mt-3 mt-md-0 btn bg-main list-btn'>
                    メールを送る
                </a>
                <a href={`/radio_program/${id}`} className='col-md-2 offset-md-1 mt-3 mt-md-0 btn list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
