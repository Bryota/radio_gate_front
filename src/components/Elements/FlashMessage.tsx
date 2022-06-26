import '../../assets/css/components/flash_message.css';

type FlashMessageType = {
    message: string
}

export const FlashMessage = ({ message }: FlashMessageType): JSX.Element => {
    return (
        <div className='text-center py-4 flash_message'>
            <p className='text-white font-20 fw-bold'>{message}</p>
        </div>
    )
}
