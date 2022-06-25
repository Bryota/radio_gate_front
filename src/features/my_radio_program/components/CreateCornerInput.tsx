type validatedArrayType = {
    key: string,
    message: string
}

type FormInputType = {
    myProgeamConrerId: number
    key: string,
    value?: string,
    text: string,
    type?: string
    isFirstItem?: boolean
    validationMessages?: Array<validatedArrayType>
    changeAction?: (event: React.ChangeEvent<HTMLInputElement>) => void
    deleteFormAction?: (id: number) => void
}

export const CreateCornerInput = ({ myProgeamConrerId, key, value = '', text, type = 'text', isFirstItem = false, validationMessages = [], changeAction = () => { }, deleteFormAction = () => { } }: FormInputType): JSX.Element => {
    return (
        <div className={isFirstItem ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-5 position-relative'>
                <input type={type} id={key} className='position-absolute underline-green' value={value} onChange={e => changeAction(e)} />
            </div>
            <div className="col-3">
                <button className='bg-post font-20 my_radio_program-corner-delete-btn' onClick={() => deleteFormAction(myProgeamConrerId)}>入力項目を消す</button>
            </div>
            {
                validationMessages.map(validationMessage => {
                    return (
                        <p className='mt-2 color-accent'>{validationMessage.message}</p>
                    )
                })
            }
        </div>
    )
}
