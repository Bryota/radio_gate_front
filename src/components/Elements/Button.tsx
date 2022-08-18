import '../../assets/css/components/button.css';

type ButtonType = {
    text: string
    type: string
    line_left?: boolean
    disable?: boolean
    data_testid?: string
    clickAction: () => void
}

export const Button = ({ text, type, line_left = false, disable = false, data_testid = '', clickAction }: ButtonType): JSX.Element => {
    if (type == 'post') {
        return (
            <div className={line_left ? 'text-left mt-4 mt-md-0' : 'text-center'}>
                <button className={disable ? ' bg-disable button' : 'bg-accent button'} data-testid={data_testid} onClick={clickAction} disabled={disable}>{text}</button>
            </div>
        )
    } else if (type == 'get') {
        return (
            <div className={line_left ? 'text-left mt-4 mt-md-0' : 'text-center'}>
                <button className={disable ? ' bg-disable button' : 'bg-main button'} data-testid={data_testid} onClick={clickAction} disabled={disable}>{text}</button>
            </div>
        )
    } else {
        return (
            <div className={line_left ? 'text-left mt-4 mt-md-0' : 'text-center'}>
                <button className={disable ? ' bg-disable button' : 'bg-delete button'} data-testid={data_testid} onClick={clickAction} disabled={disable}>{text}</button>
            </div>
        )
    }
}
