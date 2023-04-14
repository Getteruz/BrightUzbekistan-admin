import LetteredAvatar from 'react-lettered-avatar'
import cls from './Avatar.module.scss'

const Avatar = ({src, size, name = '', onClick}) => {
    return (
        <div className={`${cls.avatar} ${size === 'lg' ? cls.lg : ''}`} onClick={onClick}>
            {src ? <img src={src} alt="user avatar" /> : <LetteredAvatar name={name} size={size === 'lg' ? 120 : 40} />}
        </div>
    );
}

export default Avatar;
