import '../../../assets/css/radio.css';

type SelectedMessageTemplateType = {
    name: string
}

export const SelectedMessageTemplate = ({ name }: SelectedMessageTemplateType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="selected_my_radio_program row">
                    <p className='col-7 my_radio_program-name'>{name}</p>
                </div>
            </div>
        </>
    )
}
