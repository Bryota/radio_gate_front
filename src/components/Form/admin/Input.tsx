import '../../../assets/css/elements/form.css'

type FormInputType = {
    key: string,
    value?: string,
    text: string,
    type?: string
    is_post_code?: boolean
    is_first_item?: boolean
}

export const AdminInput = ({ key, value = '', text, type = 'text' }: FormInputType): JSX.Element => {
    return (
        <div className='m-auto mt-4 admin-input'>
            <div className='mb-2 font-30'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div>
                <input type={type} id={key} defaultValue={value} className='px-3' />
            </div>
        </div>
    )
}
