import { Resizable } from "re-resizable";
import '../../assets/css/components/navbar.css';
import MailIcon from '../../assets/images/navigation_icons/mail_icon.svg';
import RadioStationIcon from '../../assets/images/navigation_icons/radio_station_icon.svg';
import MyRadioProgramIcon from '../../assets/images/navigation_icons/my_radio_program.svg';
import MessageTemplateIcon from '../../assets/images/navigation_icons/message_template.svg';
import FunctionRequestIcon from '../../assets/images/navigation_icons/function_request.svg';
import ContactIcon from '../../assets/images/navigation_icons/contact.svg';
import SettingIcon from '../../assets/images/navigation_icons/setting.svg';

export const Navbar = (): JSX.Element => {
    return (
        <Resizable
            className='navbar'
            defaultSize={{ width: 75, height: '100vh' }}
            minWidth={75}
            maxWidth={215}
            enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        >
            <p>アイコン</p>
            <div className="navbar-icon__wrap">
                <div className="text-left mb-4 mt-5">
                    <a href="/message_post" className="d-flex">
                        <img src={MailIcon} alt="" className='navbar-icon' />
                        <p>投稿</p>
                    </a>
                </div>
                <div className="text-left mb-4">
                    <a href="/radio_stations" className="d-flex">
                        <img src={RadioStationIcon} alt="" className='navbar-icon' />
                        <p>ラジオ局</p>
                    </a>
                </div>
                <div className="text-left mb-4">
                    <a href="/my_radio_programs" className="d-flex">
                        <img src={MyRadioProgramIcon} alt="" className='navbar-icon' />
                        <p>マイラジオ番組</p>
                    </a>
                </div>
                <div className="text-left mb-4">
                    <a href="/message_templates" className="d-flex">
                        <img src={MessageTemplateIcon} alt="" className='navbar-icon' />
                        <p>メッセージ<br />テンプレート</p>
                    </a>
                </div>
                <div className="text-left mb-4">
                    <a href="/request_functions" className="d-flex">
                        <img src={FunctionRequestIcon} alt="" className='navbar-icon' />
                        <p>機能リクエスト</p>
                    </a>
                </div>
                <div className="text-left mb-4">
                    <a href="/inquiry" className="d-flex">
                        <img src={ContactIcon} alt="" className='navbar-icon' />
                        <p>お問い合わせ</p>
                    </a>
                </div>
                <div className="text-left mb-4">
                    <a href="/profile" className="d-flex">
                        <img src={SettingIcon} alt="" className='navbar-icon' />
                        <p>個人設定</p>
                    </a>
                </div>
            </div>
        </Resizable>
    )
}
