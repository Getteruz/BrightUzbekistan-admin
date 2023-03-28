import { useNavigate } from 'react-router-dom';
import LetteredAvatar from 'react-lettered-avatar';
import Avatar from '../Avatar';
import cls from './UserItem.module.scss'
import parseTimestamp from '../../utils/parseTimestamp';

const UserItem = ({
    id = '',
    image = '',
    name = '',
    role = '',
    editing = false,
    time
}) => {
    const navigate = useNavigate()
    const {hours, minutes} = parseTimestamp(time)
    return (
        <div className={cls.item} onClick={() => navigate(`/users/${id}`)}>
            {image ? <Avatar src={image} /> : <LetteredAvatar size={40} name={name} />}
            <div className={cls.item__info}>
                <p className={cls.item__info__name}>{name}</p>
                <span className={cls.item__info__role}>
                    <span>{role}</span>
                    {editing ? 
                        <span className={cls.editing}>Редак...</span> : 
                        time && <span>{`${hours}:${minutes}`}</span>}
                </span>
            </div>
        </div>
    );
}

export default UserItem;
