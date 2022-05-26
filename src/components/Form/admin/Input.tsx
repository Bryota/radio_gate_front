import '../../../assets/css/elements/form.css'

type FormInputType = {
    key: string,
    value?: string,
    text: string,
    type?: string
    is_post_code?: boolean
    is_first_item?: boolean
    is_disable?: boolean
}

export const AdminInput = ({ key, value = '', text, type = 'text', is_disable = false }: FormInputType): JSX.Element => {
    return (
        <div className='m-auto mt-4 admin-input'>
            <div className='mb-2 font-30'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div>
                {
                    is_disable
                        ?
                        <input type={type} id={key} defaultValue={value} className='px-3' readOnly />
                        :
                        <input type={type} id={key} defaultValue={value} className='px-3' />
                }

            </div>
        </div>
    )
}
