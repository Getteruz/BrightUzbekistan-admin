import { useSelector } from 'react-redux';
import getRandomEl from '../../../utils/getRandomEl';
import parseTimestamp from '../../../utils/parseTimestamp';
import ChatProfile from '../ChatProfile';
import cls from './ChatMessage.module.scss'

const colors = ['#D8EBF7', '#FAF3FF', '#E5F8EB', '#FCF7EA', '#FFEAE6']

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
                <div className={cls.msg__body} style={{background: `${getRandomEl(colors)} !important`}}>
                    {message}
                </div>
                <span className={cls.msg__time}>{hours}:{minutes}</span>
            </div>
        </div>
    );
}

export default ChatMessage;
