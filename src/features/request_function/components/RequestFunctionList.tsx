import '../../../assets/css/radio.css';

type RequestFunctionType = {
    name: string
    point: number
}

export const RequestFunctionList = ({ name, point }: RequestFunctionType): JSX.Element => {
    return (
        <>
            <div className='radio-item row align-items-center'>
                <p className='col-5 radio-name'>{name}</p>
                <p className='col-2 h4'>{point}Pt</p>
                <a href="#" className='col-2 radio-btn btn'>
                    投票する
                </a>
                <a href="#" className='col-2 offset-1 radio-btn btn btn-get'>
                    詳細
                </a>
            </div>
        </>
    )
}
