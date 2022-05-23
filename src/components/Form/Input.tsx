import '../../assets/css/elements/form.css'

type FormInputType = {
    key: string,
    value?: string,
    text: string,
    type?: string
    is_post_code?: boolean
    is_first_item?: boolean
}

export const Input = ({ key, value = '', text, type = 'text', is_post_code = false, is_first_item = false }: FormInputType): JSX.Element => {
    return (
        <div className={is_first_item ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-8 position-relative'>
                <input type={type} id={key} className='position-absolute underline-green' value={value} />
                {is_post_code && <button className='position-absolute'>自動入力</button>}
            </div>
        </div>
    )
}
