import '../../../assets/css/elements/radio.css';

import { FormInputType } from '../../../types/common';

export const EditInputItem = ({ myProgeamConrerId, key, value = '', text, type = 'text', isFirstItem = false, validationMessages = [], data_testid = '', changeAction = () => { }, deleteAction = () => { }, deleteFormAction = () => { } }: FormInputType): JSX.Element => {
    return (
        <div className={isFirstItem ? 'row mt-0 form-input_item' : 'row form-input_item'}>
            <div className='col-4'>
                <label htmlFor={key}>{text}</label>
            </div>
            <div className='col-5 position-relative'>
                <input type={type} id={key} className='position-absolute underline-green' value={value} date-testid={data_testid} onChange={e => changeAction(e)} />
            </div>
            <div className="col-3">
                <button className='bg-delete font-20 my_radio_program-corner-delete-btn' onClick={() => deleteAction(myProgeamConrerId)}>コーナーを削除</button>
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
