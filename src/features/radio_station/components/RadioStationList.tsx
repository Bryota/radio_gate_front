import '../../../assets/css/elements/radio.css';

type RadioStationType = {
    name: string
}

export const RadioStationList = (props: RadioStationType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <div className='col-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-8 font-25'>{props.name}</p>
                <a href="#" className='col-2 btn list-btn'>
                    番組一覧
                </a>
            </div>
        </>
    )
}
