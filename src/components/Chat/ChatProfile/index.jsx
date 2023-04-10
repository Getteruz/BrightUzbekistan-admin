import cls from './ChatProfile.module.scss'

const ChatProfile = ({
    reverse = false
}) => {
    return (
        <div className={`${cls.profile} ${reverse ? cls.reverse : ''}`}>
            <div className={cls.profile__avatar}>
                <img src='https://images.unsplash.com/photo-1680879831221-21622d11b374?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' />
            </div>
            <div className={cls.profile__info}>
                <span className={cls.profile__name}>Шахбоз Самадов</span>
                <span className={cls.profile__role}>Редактор</span>
            </div>
        </div>
    );
}

export default ChatProfile;
