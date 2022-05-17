import '../../assets/css/form/input.css'

type FormInputType = {
    key: string,
    text: string,
    type?: string
    is_post_code?: boolean
}

export const Input = ({ key, text, type = 'text', is_post_code = false }: FormInputType): JSX.Element => {
    return (
        <div className="form-input_item row">
            <div className='col-3'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-8 position-relative'>
                <input type={type} id={key} className='position-absolute' />
                {is_post_code && <button className='position-absolute'>自動入力</button>}
            </div>
        </div>
    )
}
