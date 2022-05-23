import '../../../assets/css/elements/radio.css';

type RadioProgramType = {
    name: string
}

export const RadioProgramList = (props: RadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <div className='col-2 radio-icon'>
                    アイコン
                </div>
                <p className='col-5 font-25'>{props.name}</p>
                <a href="#" className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
                <a href="#" className='col-2 offset-1 btn list-btn'>
                    コーナー一覧
                </a>
            </div>
        </>
    )
}
