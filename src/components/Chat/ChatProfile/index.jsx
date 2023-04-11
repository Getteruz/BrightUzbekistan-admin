import LetteredAvatar from 'react-lettered-avatar';
import cls from './ChatProfile.module.scss'

const ChatProfile = ({
    id = '',
    avatar = '',
    fullName = '',
    role = '',
    isMyMsg = false,
}) => {
    return (
        <div className={`${cls.profile} ${isMyMsg ? cls.reverse : ''}`}>
            <div className={cls.profile__avatar}>
                {avatar ? <img src={avatar} /> : <LetteredAvatar name={fullName} size={40} />}
            </div>
            <div className={cls.profile__info}>
                <span className={cls.profile__name}>{isMyMsg ? 'Я' : fullName}</span>
                <span className={cls.profile__role}>{role}</span>
            </div>
        </div>
    );
}

export default ChatProfile;
