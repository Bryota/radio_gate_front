import { TopFunctionItem } from './TopFunctionItem';

import MailIcon from '../../../assets/images/top_icons/mail_icon.svg';
import MessagesIcon from '../../../assets/images/top_icons/messages.svg';
import SavedMessagesIcon from '../../../assets/images/top_icons/saved_messages.svg';
import MyRadioProgramIcon from '../../../assets/images/top_icons/my_radio_program.svg';
import MessageTemplateIcon from '../../../assets/images/top_icons/message_template.svg';
import FunctionRequestIcon from '../../../assets/images/top_icons/function_request.svg';

export const TopFunction = () => {
    return (
        <div className='my-md-4'>
            <span className='border-bottom border-dark border-2 pb-1 font-20'>機能紹介</span>
            <div className='row mt-md-3 text-center top_function'>
                <TopFunctionItem
                    name='メッセージ投稿'
                    icon={MailIcon}
                    url='message_post'
                />
                <TopFunctionItem
                    name='投稿一覧'
                    icon={MessagesIcon}
                    url='messages'
                />
                <TopFunctionItem
                    name='投稿一時保存'
                    icon={SavedMessagesIcon}
                    url='saved_messages'
                />
                <TopFunctionItem
                    name='メッセージテンプレート'
                    icon={MessageTemplateIcon}
                    url='message_templates'
                />
                <TopFunctionItem
                    name='機能リクエスト'
                    icon={FunctionRequestIcon}
                    url='request_functions'
                />
                <TopFunctionItem
                    name='マイラジオ番組'
                    icon={MyRadioProgramIcon}
                    url='my_radio_programs'
                />
            </div>
        </div>
    )
}
