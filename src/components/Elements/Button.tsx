import '../../assets/css/element/button.css';

type ButtonType = {
    text: string
    type: string
    click_action: () => {}
}

export const Button = ({ text, type, click_action }: ButtonType): JSX.Element => {
    if (type == 'post') {
        return (
            <div className='text-center'>
                <button className='element-btn element-btn-post' onClick={click_action}>{text}</button>
            </div>
        )
    } else if (type == 'get') {
        return (
            <div className='text-center'>
                <button className='element-btn element-btn-get' onClick={click_action}>{text}</button>
            </div>
        )
    } else {
        return (
            <div className='text-center'>
                <button className='element-btn element-btn-delete' onClick={click_action}>{text}</button>
            </div>
        )
    }
}
