import '../../assets/css/components/button.css';

type ButtonType = {
    text: string
    type: string
    line_left?: boolean
    clickAction: () => void
}

export const Button = ({ text, type, line_left = false, clickAction }: ButtonType): JSX.Element => {
    if (type == 'post') {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='bg-accent button' onClick={clickAction}>{text}</button>
            </div>
        )
    } else if (type == 'get') {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='bg-main button' onClick={clickAction}>{text}</button>
            </div>
        )
    } else {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='bg-delete button' onClick={clickAction}>{text}</button>
            </div>
        )
    }
}
