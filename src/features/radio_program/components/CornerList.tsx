import '../../../assets/css/elements/radio.css';

type CornerListType = {
    name: string
}

export const CornerList = ({ name }: CornerListType): JSX.Element => {
    return (
        <>
            <div className='row mt-4 p-2rem list-item'>
                <p className='col-9 font-25'>{name}</p>
                <a href="#" className='col-2 btn bg-main list-btn'>
                    メールを送る
                </a>
            </div>
        </>
    )
}
