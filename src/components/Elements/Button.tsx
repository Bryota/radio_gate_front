import '../../assets/css/element/button.css';

type ButtonType = {
    text: string
    type: string
    click_action: () => {}
}

export const Button = ({ text, type, click_action }: ButtonType): JSX.Element => {
    return (
        <div className='text-center'>
            <button className='element-btn element-btn-post' onClick={click_action}>{text}</button>
        </div>
    )
}
