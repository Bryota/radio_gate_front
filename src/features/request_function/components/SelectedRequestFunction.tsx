import '../../../assets/css/radio.css';

type SelectedRequestFunctionType = {
    name: string
}

export const SelectedRequestFunction = ({ name }: SelectedRequestFunctionType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="selected_my_radio_program row">
                    <p className='my_radio_program-name'>{name}</p>
                </div>
            </div>
        </>
    )
}
