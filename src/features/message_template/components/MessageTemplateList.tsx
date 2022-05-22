import '../../../assets/css/elements/radio.css';

type MyRadioProgramType = {
    name: string
}

export const MessageTemplateList = ({ name }: MyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='radio-item row'>
                <p className='col-9 radio-name'>{name}</p>
                <a href="#" className='col-2 radio-btn btn btn-get'>
                    詳細
                </a>
            </div>
        </>
    )
}
