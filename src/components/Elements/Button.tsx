import '../../assets/css/components/button.css';

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
                <button className='bg-accent button' onClick={click_action}>{text}</button>
            </div>
        )
    } else if (type == 'get') {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='bg-main button' onClick={click_action}>{text}</button>
            </div>
        )
    } else {
        return (
            <div className={line_left ? 'text-left' : 'text-center'}>
                <button className='bg-delete button' onClick={click_action}>{text}</button>
            </div>
        )
    }
}
