import '../../../assets/css/elements/radio.css';

type MyRadioProgramType = {
    name: string
}

export const MyRadioProgramList = ({ name }: MyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-7 font-25'>{name}</p>
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
