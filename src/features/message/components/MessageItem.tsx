import '../../../assets/css/radio.css';

type MessageItemType = {
    item_name: string
    value: string
}

export const MessageItem = ({ item_name, value }: MessageItemType): JSX.Element => {
    return (
        <>
            <div className='message-item row mb-5'>
                <p>{item_name}</p>
                <div>
                    {value}
                </div>
            </div>
        </>
    )
}
