import '../../../assets/css/elements/radio.css';
import MailIcon from '../../../assets/images/mail_icon.svg';

import { HowToUseType } from '../../../types/listener';

export const HowToUseItem = ({ title, text }: HowToUseType): JSX.Element => {
    return (
        <>
            <div className='mb-5'>
                <div className="row align-items-center mb-3 pb-2 underline-green how_to_use-title">
                    <img src={MailIcon} alt="メール" className='col-1' />
                    <p className='col-11 font-25'>{title}</p>
                </div>
                <div className='how_to_use-text'>{text}</div>
            </div>
        </>
    )
}
