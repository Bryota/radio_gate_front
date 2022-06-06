import '../../assets/css/elements/form.css'

type FormCheckType = {
    label: string,
    text: string,
    is_first_item?: boolean
    change_action?: () => void
}

export const CheckBox = ({ label, text, is_first_item = false, change_action = () => { } }: FormCheckType): JSX.Element => {
    return (
        <div className={is_first_item ? 'row mt-0 radio-checkbox' : 'row radio-checkbox'}>
            <div className='col-4 checkbox'>
                <input type='checkbox' id={label} className='chechbox' onChange={e => change_action()} />
                <label className='checkbox' htmlFor={label}></label>
            </div>
            <div className='col-8'>
                <p className='font-20'>{text}</p>
            </div>
        </div>
    )
}
