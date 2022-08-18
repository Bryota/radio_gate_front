import '../../../assets/css/elements/radio.css';

import { RadioStationType } from '../../../types/listener';

export const RadioStation = ({ name }: RadioStationType): JSX.Element => {
    return (
        <>
            <div className='row underline-green'>
                <div className='col-md-2'>
                    アイコン
                </div>
                <p className='col-md-10 font-30'>{name}の番組一覧</p>
            </div>
        </>
    )
}
