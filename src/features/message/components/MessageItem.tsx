import '../../../assets/css/elements/radio.css';

type MessageItemType = {
    item_name: string
    value?: string
}

export const MessageItem = ({ item_name, value }: MessageItemType): JSX.Element => {
    return (
        <>
            <div className='row mb-5'>
                <p className='mb-2 font-25'>{item_name}</p>
                <div className='px-4 py-3 font-20 inner-box'>
                    {value}
                </div>
            </div>
        </>
    )
}
