import '../../../assets/css/elements/radio.css';

type SelectedMyRadioProgramType = {
    name: string
    email: string
}

export const SelectedMyRadioProgram = ({ name, email }: SelectedMyRadioProgramType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row underline-green p-1rem">
                    <p className='col-7 font-40'>{name}</p>
                    <a href="#" className='col-2 btn bg-main list-btn'>
                        メールを送る
                    </a>
                    <a href="#" className='col-2 offset-1 btn list-btn'>
                        編集
                    </a>
                </div>
                <p className='mt-2 ps-3 font-20'>{email}</p>
            </div>
        </>
    )
}
