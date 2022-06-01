import '../../../assets/css/elements/radio.css';

type MyRadioProgramType = {
    id: number
    name: string
}

export const MyRadioProgramList = ({ id, name }: MyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-7 font-25'>{name}</p>
                <a href={`/message_post?radio_program=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
                <a href={`/my_radio_program/${id}`} className='col-2 offset-1 btn list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
