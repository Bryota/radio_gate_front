import '../../../assets/css/radio.css';

type RadioStationType = {
    name: string
}

export const RadioStationList = (props: RadioStationType): JSX.Element => {
    return (
        <>
            <div className='radio-item row'>
                <div className='col-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-8 radio-name'>{props.name}</p>
                <a href="#" className='col-2 radio-btn btn'>
                    番組一覧
                </a>
            </div>
        </>
    )
}
