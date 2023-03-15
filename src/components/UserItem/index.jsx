import { useNavigate } from 'react-router-dom';
import LetteredAvatar from 'react-lettered-avatar';
import Avatar from '../Avatar';
import cls from './UserItem.module.scss'

const UserItem = ({
    id = '',
    image = '',
    name = '',
    role = ''
}) => {
    const navigate = useNavigate()

    return (
        <div className={cls.item} onClick={() => navigate(`/users/${id}`)}>
            {image ? <Avatar src={image} /> : <LetteredAvatar size={40} name={name} />}
            <div className={cls.item__info}>
                <p className={cls.item__info__name}>{name}</p>
                <p className={cls.item__info__role}>{role}</p>
            </div>
        </div>
    );
}

export default UserItem;
