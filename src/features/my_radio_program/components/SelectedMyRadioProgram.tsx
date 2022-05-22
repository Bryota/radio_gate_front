import '../../../assets/css/elements/radio.css';

type SelectedMyRadioProgramType = {
    name: string
    email: string
}

export const SelectedMyRadioProgram = ({ name, email }: SelectedMyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="selected_my_radio_program row">
                    <p className='col-7 my_radio_program-name'>{name}</p>
                    <a href="#" className='col-2 radio-btn btn btn-get'>
                        メールを送る
                    </a>
                    <a href="#" className='col-2 offset-1 radio-btn btn'>
                        編集
                    </a>
                </div>
                <p className='mt-2 my_radio_program-email'>{email}</p>
            </div>
        </>
    )
}
