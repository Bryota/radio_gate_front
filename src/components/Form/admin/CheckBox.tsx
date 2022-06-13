type FormCheckType = {
    label: string,
    text: string,
    change_action?: () => void
}

export const AdminCheckBox = ({ label, text, change_action = () => { } }: FormCheckType): JSX.Element => {
    return (
        <div className='mx-auto row radio-checkbox admin-input'>
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
