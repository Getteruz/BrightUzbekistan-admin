import { useSelector } from 'react-redux';
import parseTimestamp from '../../../utils/parseTimestamp';
import ChatProfile from '../ChatProfile';
import cls from './ChatMessage.module.scss'

const ChatMessage = ({
    message = '',
    admin = {},
    date = '',
    onClick = () => { }
}) => {
    const { user } = useSelector(state => state.auth)
    admin = admin?.id === user?.id ? {...user} : admin
    const {hours, minutes} = parseTimestamp(date)

    return (
        <div className={`${cls.msg} ${admin?.id === user?.id ? cls.reverse : ''}`} onClick={onClick}>
            <ChatProfile
                id={admin?.id}
                avatar={admin?.avatar}
                fullName={admin?.fullName}
                role={admin?.position?.title}
                isMyMsg={admin?.id === user?.id}
            />
            <div className={cls.msg__wrapper}>
                <div className={cls.msg__body}>
                    {message}
                </div>
                <span className={cls.msg__time}>{hours}:{minutes}</span>
            </div>
        </div>
    );
}

export default ChatMessage;
