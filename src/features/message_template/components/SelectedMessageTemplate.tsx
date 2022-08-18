import '../../../assets/css/elements/radio.css';

export const SelectedMessageTemplate = ({ name }: { name?: string }): JSX.Element => {
    return (
        <>
            <div className='mb-4 mb-md-5'>
                <div className="row underline-green">
                    <p className='col-7 font-40'>{name}</p>
                </div>
            </div>
        </>
    )
}
