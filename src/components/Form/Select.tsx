import '../../assets/css/elements/form.css';
import { SelectItemType } from '../../types/common';


type validatedArrayType = {
    key: string,
    message: string
}

type FormSelectType = {
    key: string,
    value?: string,
    text: string,
    items?: SelectItemType[]
    selected_id?: number
    validationMessages?: Array<validatedArrayType>
    changeAction?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ key, value = '', items, text, selected_id, validationMessages = [], changeAction = () => { } }: FormSelectType): JSX.Element => {
    return (
        <div className='row form-input_item'>
            <div className='col-12 col-md-4'>
                <label htmlFor={key} className='font-md-15'>{text}</label>
            </div>
            <div className='col-12 col-md-8 position-relative'>
                <select id={key} className='w-100 border-0 underline-green' defaultValue={value} onChange={e => changeAction(e)} >
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
                        <p className='mt-2 color-accent font-md-15'>{validationMessage.message}</p>
                    )
                })
            }
        </div>
    )
}
