import '../../../assets/css/elements/form.css'

type FormInputType = {
    key: string,
    value?: string,
    text: string,
    is_post_code?: boolean
    is_first_item?: boolean
}

export const AdminTextarea = ({ key, value = '', text }: FormInputType): JSX.Element => {
    return (
        <div className='m-auto mt-4 admin-input'>
            <div className='mb-2 font-30'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div>
                <textarea rows={15} cols={103} id={key} defaultValue={value} className='p-3' />
            </div>
        </div>
    )
}
