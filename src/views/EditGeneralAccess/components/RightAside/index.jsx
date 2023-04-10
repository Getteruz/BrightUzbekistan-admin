import ChatInput from '../../../../components/Chat/ChatInput';
import ChatMessagesList from '../../../../components/Chat/ChatMessagesList';
import ChatNavbar from '../../../../components/Chat/ChatNavbar';
import cls from './RightAside.module.scss'

const RightAside = () => {
    return (
        <div className={cls.chat}>
            <ChatNavbar />
            <div className={cls.chat__body}>
                <ChatMessagesList />
            </div>
            <ChatInput />
        </div>
    );
}

export default RightAside;
