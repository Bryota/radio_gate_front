import { isTemplateMiddle } from 'typescript'
import '../../assets/css/elements/form.css'

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
    change_action?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ key, value = '', items, text, change_action = () => { } }: FormSelectType): JSX.Element => {
    return (
        <div className='row form-input_item'>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-8 position-relative'>
                <select id={key} className='position-absolute w-100 border-0 underline-green' defaultValue={value} onChange={e => change_action(e)} >
                    <option hidden>選択してください</option>
                    {
                        items?.map(item => {
                            return (
                                <option value={item.id}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
