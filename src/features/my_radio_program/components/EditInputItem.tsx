import '../../../assets/css/elements/radio.css';

type FormInputType = {
    key: string,
    value?: string,
    text: string,
    type?: string
    is_post_code?: boolean
    is_first_item?: boolean
}

export const EditInputItem = ({ key, value = '', text, type = 'text', is_post_code = false, is_first_item = false }: FormInputType): JSX.Element => {
    const click_handler = () => {
        return '';
    }
    return (
        <div className={is_first_item ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-5 position-relative'>
                <input type={type} id={key} className='position-absolute underline-green' value={value} />
            </div>
            <div className="col-3">
                <button className='bg-delete font-20 my_radio_program-corner-delete-btn' onClick={click_handler}>コーナーを削除</button>
            </div>
        </div>
    )
}
