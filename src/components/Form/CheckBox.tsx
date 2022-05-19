import '../../assets/css/form/checkbox.css'

type FormCheckType = {
    label: string,
    text: string,
    is_first_item?: boolean
}

export const CheckBox = ({ label, text, is_first_item = false }: FormCheckType): JSX.Element => {
    return (
        <div className={is_first_item ? 'radio-checkbox row mt-0' : 'radio-checkbox row'}>
            <div className='col-4 checkbox'>
                <input type='checkbox' id={label} className='chechbox' />
                <label className='checkbox' htmlFor={label}></label>
            </div>
            <div className='col-8'>
                <p>{text}</p>
            </div>
        </div>
    )
}
