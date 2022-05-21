import '../../../assets/css/radio.css';

type SelectedMessageType = {
    name: string
    post_date: string
}

export const SelectedMessage = ({ name, post_date }: SelectedMessageType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="selected_my_radio_program">
                    <p className='my_radio_program-name'>{name}</p>
                </div>
                <p className='mt-2 my_radio_program-email'>{post_date} 投稿済み</p>
            </div>
        </>
    )
}
