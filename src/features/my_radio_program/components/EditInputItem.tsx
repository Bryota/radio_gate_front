import '../../../assets/css/elements/radio.css';

type FormInputType = {
    my_progeam_conrer_id: number
    key: string,
    value?: string,
    text: string,
    type?: string
    is_first_item?: boolean
    change_action?: (event: React.ChangeEvent<HTMLInputElement>) => void
    click_action?: (id: number) => void
}

export const EditInputItem = ({ my_progeam_conrer_id, key, value = '', text, type = 'text', is_first_item = false, change_action = () => { }, click_action = () => { } }: FormInputType): JSX.Element => {
    return (
        <div className={is_first_item ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-5 position-relative'>
                <input type={type} id={key} className='position-absolute underline-green' value={value} onChange={e => change_action(e)} />
            </div>
            <div className="col-3">
                <button className='bg-delete font-20 my_radio_program-corner-delete-btn' onClick={() => click_action(my_progeam_conrer_id)}>コーナーを削除</button>
            </div>
        </div>
    )
}
