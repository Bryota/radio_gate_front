import '../../assets/css/elements/form.css'

type FormInputType = {
    key: string,
    value?: string | undefined,
    text: string,
    is_post_code?: boolean
    is_first_item?: boolean
    change_action?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea = ({ key, value = undefined, text, is_post_code = false, is_first_item = false, change_action = () => { } }: FormInputType): JSX.Element => {
    return (
        <div className={is_first_item ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-8 position-relative'>
                <textarea rows={25} cols={50} id={key} defaultValue={value} onChange={e => change_action(e)} />
                {is_post_code && <button>自動入力</button>}
            </div>
        </div>
    )
}
