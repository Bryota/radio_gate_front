import '../../assets/css/element/button.css';

type ButtonType = {
    text: string
    type: string
    line_left?: boolean
    click_action: () => {}
}

export const Button = ({ text, type, line_left = false, click_action }: ButtonType): JSX.Element => {
    if (type == 'post') {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='element-btn element-btn-post' onClick={click_action}>{text}</button>
            </div>
        )
    } else if (type == 'get') {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='element-btn element-btn-get' onClick={click_action}>{text}</button>
            </div>
        )
    } else {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='element-btn element-btn-delete' onClick={click_action}>{text}</button>
            </div>
        )
    }
}
