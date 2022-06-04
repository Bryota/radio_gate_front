import '../../../assets/css/elements/radio.css';

type SelectedMessageType = {
    name?: string
    post_date?: string
}

export const SelectedMessage = ({ name, post_date }: SelectedMessageType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="underline-green p-1rem">
                    <p className='font-40'>{name}</p>
                </div>
                <p className='mt-2 ps-3 font-20'>{post_date} 投稿済み</p>
            </div>
        </>
    )
}
