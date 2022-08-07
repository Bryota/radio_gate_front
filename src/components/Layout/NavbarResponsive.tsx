import { Resizable } from "re-resizable";
import '../../assets/css/components/navbar.css';
import MailIcon from '../../assets/images/navigation_icons/mail_icon.svg';
import RadioStationIcon from '../../assets/images/navigation_icons/radio_station_icon.svg';
import MyRadioProgramIcon from '../../assets/images/navigation_icons/my_radio_program.svg';
import MessageTemplateIcon from '../../assets/images/navigation_icons/message_template.svg';
import FunctionRequestIcon from '../../assets/images/navigation_icons/function_request.svg';
import ContactIcon from '../../assets/images/navigation_icons/contact.svg';
import SettingIcon from '../../assets/images/navigation_icons/setting.svg';

export const NavbarResponsive = (): JSX.Element => {
    return (
        <div className="navbar-responsive">
            <div className="row p-3">
                <div className="text-left col-2 text-center">
                    <a href="/message_post">
                        <img src={MailIcon} alt="" className='navbar-icon' />
                    </a>
                </div>
                <div className="text-left col-2 text-center">
                    <a href="/radio_stations">
                        <img src={RadioStationIcon} alt="" className='navbar-icon' />
                    </a>
                </div>
                <div className="text-left col-2 text-center">
                    <a href="/message_templates">
                        <img src={MessageTemplateIcon} alt="" className='navbar-icon' />
                    </a>
                </div>
                <div className="text-left col-2 text-center">
                    <a href="/request_functions">
                        <img src={FunctionRequestIcon} alt="" className='navbar-icon' />
                    </a>
                </div>
                <div className="text-left col-2 text-center">
                    <a href="/inquiry">
                        <img src={ContactIcon} alt="" className='navbar-icon' />
                    </a>
                </div>
                <div className="text-left col-2 text-center">
                    <a href="/profile">
                        <img src={SettingIcon} alt="" className='navbar-icon' />
                    </a>
                </div>
            </div>
        </div>
    )
}
