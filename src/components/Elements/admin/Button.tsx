import '../../../assets/css/components/button.css';

type ButtonType = {
    text: string
    type: string
    line_left?: boolean
    click_action: () => {}
}

export const AdminButton = ({ text, type, line_left = false, click_action }: ButtonType): JSX.Element => {
    if (type == 'post') {
        return (
            <div className={line_left ? 'text-left mt-4 ' : 'text-center mt-4'}>
                <button className='bg-accent button admin-button' onClick={click_action}>{text}</button>
            </div>
        )
    } else if (type == 'get') {
        return (
            <div className={line_left ? 'text-left mt-4' : 'text-center mt-4'}>
                <button className='bg-main button admin-button' onClick={click_action}>{text}</button>
            </div>
        )
    } else {
        return (
            <div className={line_left ? 'text-left mt-4' : 'text-center mt-4'}>
                <button className='bg-delete button admin-button' onClick={click_action}>{text}</button>
            </div>
        )
    }
}
