import '../../assets/css/elements/form.css'

type validatedArrayType = {
    key: string,
    message: string
}

type FormInputType = {
    key: string,
    value?: string | undefined,
    text: string,
    is_post_code?: boolean
    is_first_item?: boolean
    data_testid?: string
    validationMessages?: Array<validatedArrayType>
    changeAction?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea = ({ key, value = undefined, text, is_post_code = false, is_first_item = false, data_testid = '', validationMessages = [], changeAction = () => { } }: FormInputType): JSX.Element => {
    return (
        <div className={is_first_item ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-12 col-lg-4'>
                <label htmlFor={key} className='font-md-15'>{text}</label>
                {
                    validationMessages.map(validationMessage => {
                        return (
                            <p className='mt-2 color-accent font-md-15'>{validationMessage.message}</p>
                        )
                    })
                }
            </div>
            <div className='col-12 col-lg-8 mt-lg-1 mt-3 position-relative'>
                <textarea rows={25} cols={50} id={key} defaultValue={value} data-testid={data_testid} onChange={e => changeAction(e)} />
                {is_post_code && <button>自動入力</button>}
            </div>
        </div>
    )
}
