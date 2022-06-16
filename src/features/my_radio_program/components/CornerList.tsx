import '../../../assets/css/elements/radio.css';

type CornerListType = {
    id: number
    my_radio_program_id: number
    name: string
}

export const CornerList = ({ id, my_radio_program_id, name }: CornerListType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-10 font-25'>{name}</p>
                <a href={`/message_post?my_radio_program=${my_radio_program_id}&my_program_corner=${id}`} className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
            </div>
        </>
    )
}
