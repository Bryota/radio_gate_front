import '../../../assets/css/radio.css';

type MyRadioProgramType = {
    name: string
}

export const MyRadioProgramList = ({ name }: MyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='radio-item row'>
                <p className='col-7 radio-name'>{name}</p>
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
