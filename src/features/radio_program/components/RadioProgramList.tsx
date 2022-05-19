import '../../../assets/css/radio.css';

type RadioProgramType = {
    name: string
}

export const RadioProgramList = (props: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='radio-item row'>
                <div className='col-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-5 radio-name'>{props.name}</p>
                <a href="#" className='col-2 radio-btn btn btn-get'>
                    メールを送る
                </a>
                <a href="#" className='col-2 offset-1 radio-btn btn'>
                    コーナー一覧
                </a>
            </div>
        </>
    )
}
