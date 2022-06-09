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

export const AdminSelect = ({ key, value = '', items, text, change_action = () => { } }: FormSelectType): JSX.Element => {
    return (
        <div className='m-auto mt-4 admin-input'>
            <div className='mb-2 font-30'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div>
                <select id={key} className='w-100 border-0' defaultValue={value} onChange={e => change_action(e)} >
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
