import '../../assets/css/elements/form.css'

type validatedArrayType = {
    key: string,
    message: string
}

type itemType = {
    id: number
    name: string
    content?: string
    created_at: string
    updated_at: string
}

type FormSelectType = {
    key: string,
    value?: string,
    text: string,
    items?: itemType[]
    selected_id?: number
    validationMessages?: Array<validatedArrayType>
    changeAction?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ key, value = '', items, text, selected_id, validationMessages = [], changeAction = () => { } }: FormSelectType): JSX.Element => {
    return (
        <div className='row form-input_item'>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-8 position-relative'>
                <select id={key} className='position-absolute w-100 border-0 underline-green' defaultValue={value} onChange={e => changeAction(e)} >
                    <option hidden>選択してください</option>
                    {
                        items?.map(item => {
                            if (item.id === selected_id) {
                                return (
                                    <option value={item.id} selected>{item.name}</option>
                                )
                            } else {
                                return (
                                    <option value={item.id}>{item.name}</option>
                                )
                            }
                        })
                    }
                </select>
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
