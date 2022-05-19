import '../../assets/css/form/input.css'

type FormInputType = {
    key: string,
    value?: string | undefined,
    text: string,
    is_post_code?: boolean
    is_first_item?: boolean
}

export const Textarea = ({ key, value = undefined, text, is_post_code = false, is_first_item = false }: FormInputType): JSX.Element => {
    return (
        <div className={is_first_item ? 'form-input_item row mt-0' : 'form-input_item row'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-8 position-relative'>
                <textarea rows={25} cols={50} id={key} value={value} />
                {is_post_code && <button>自動入力</button>}
            </div>
        </div>
    )
}
