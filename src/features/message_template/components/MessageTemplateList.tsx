import '../../../assets/css/elements/radio.css';

type MyRadioProgramType = {
    name: string
}

export const MessageTemplateList = ({ name }: MyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-9 font-25'>{name}</p>
                <a href="#" className='col-2 btn bg-main list-btn'>
                    詳細
                </a>
            </div>
        </>
    )
}
