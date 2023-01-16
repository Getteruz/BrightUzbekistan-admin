import cls from './Avatar.module.scss'

const Avatar = ({src, size}) => {
    return (
        <div className={`${cls.avatar} ${size === 'lg' ? cls.lg : ''}`}>
            <img src={src} alt="user avatar" />
        </div>
    );
}

export default Avatar;
