import '../../../assets/css/elements/radio.css';

type RequestFunctionType = {
    name: string
    point: number
}

export const RequestFunctionList = ({ name, point }: RequestFunctionType): JSX.Element => {
    return (
        <>
            <div className='row align-items-center mt-4 p-2rem list-item'>
                <p className='col-5 font-25'>{name}</p>
                <p className='col-2 h4'>{point}Pt</p>
                <a href="#" className='col-2 btn list-btn'>
                    投票する
                </a>
                <a href="#" className='col-2 offset-1 btn bg-main list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
