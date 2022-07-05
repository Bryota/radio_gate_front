import { RadioStationType } from '../../../types/listener';

export const RadioStationList = ({ id, name }: RadioStationType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <div className='col-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-8 font-25'>{name}</p>
                <a href={`/radio_programs/${id}`} className='col-2 btn list-btn'>
                    番組一覧
                </a>
            </div>
        </>
    )
}
