import '../../assets/css/elements/form.css'

type FormCheckType = {
    label: string,
    text: string,
    is_first_item?: boolean,
    checked?: boolean,
    changeAction?: () => void
}

export const CheckBox = ({ label, text, is_first_item = false, checked = false, changeAction = () => { } }: FormCheckType): JSX.Element => {
    return (
        <div className={is_first_item ? 'row mt-0 radio-checkbox' : 'row radio-checkbox'}>
            <div className='col-12 col-md-8 order-md-2 mb-2 mb-md-0'>
                <p className='font-20 font-md-15'>{text}</p>
            </div>
            <div className='col-12 col-md-4 order-md-1 checkbox'>
                <input type='checkbox' id={label} className='chechbox' onChange={e => changeAction()} checked={checked} />
                <label className='checkbox' htmlFor={label}></label>
            </div>

        </div>
    )
}
