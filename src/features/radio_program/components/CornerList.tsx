import '../../../assets/css/elements/radio.css';

type CornerListType = {
    id: number
    name: string
    radioProgramId: number
}

export const CornerList = ({ id, name, radioProgramId }: CornerListType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-9 font-25'>{name}</p>
                <a href={`/message_post?radio_program=${radioProgramId}&program_corner=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
            </div>
        </>
    )
}
