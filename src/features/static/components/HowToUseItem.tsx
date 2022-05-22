import '../../../assets/css/radio.css';
import MailIcon from '../../../assets/images/mail_icon.svg';

type HowToUseType = {
    title: string
    text: string
}

export const HowToUseItem = ({ title, text }: HowToUseType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="how_to_use-title row align-items-center mb-3 pb-2">
                    <img src={MailIcon} alt="メール" className='col-1' />
                    <p className='col-11'>{title}</p>
                </div>
                <div className='how_to_use-text'>{text}</div>
            </div>
        </>
    )
}
