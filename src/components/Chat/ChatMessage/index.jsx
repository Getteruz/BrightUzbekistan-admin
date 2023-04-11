import ChatProfile from '../ChatProfile';
import cls from './ChatMessage.module.scss'

const ChatMessage = ({
    reverse = false,
    onClick = () => {}
}) => {
    return (
        <div className={`${cls.msg} ${reverse ? cls.reverse : ''}`} onClick={onClick}>
            <ChatProfile reverse={reverse} />
            <div className={cls.msg__wrapper}>
                <div className={cls.msg__body}>
                    American Thinker: Россию поддерживает не только Китай, но и большая часть Южного полушария
                </div>
                <span className={cls.msg__time}>19:43</span>
            </div>
        </div>
    );
}

export default ChatMessage;
