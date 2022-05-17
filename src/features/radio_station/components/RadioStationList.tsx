import '../../../assets/css/radio-station.css';

type RadioStationType = {
    name: string
}

export const RadioStationList = (props: RadioStationType): JSX.Element => {
    return (
        <>
            <div className='radio_station-item row'>
                <div className='col-2 radio_station-icon'>
                    アイコン
                </div>
                <p className='col-8 radio_station-name'>{props.name}</p>
                <a href="#" className='col-2 radio_station-btn btn btn-danger'>
                    番組一覧
                </a>
            </div>
        </>
    )
}
