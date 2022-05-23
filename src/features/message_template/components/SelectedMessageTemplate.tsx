import '../../../assets/css/elements/radio.css';

type SelectedMessageTemplateType = {
    name: string
}

export const SelectedMessageTemplate = ({ name }: SelectedMessageTemplateType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row underline-green">
                    <p className='col-7 font-40'>{name}</p>
                </div>
            </div>
        </>
    )
}
