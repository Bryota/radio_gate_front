import '../../../assets/css/radio.css';

type RadioStationType = {
    name: string
}

export const RadioStation = ({ name }: RadioStationType): JSX.Element => {
    return (
        <>
            <div className='radio_programs-radio_station row'>
                <div className='col-2'>
                    アイコン
                </div>
                <p className='radio_programs-radio_station-name col-10'>{name}の番組一覧</p>
            </div>
        </>
    )
}
