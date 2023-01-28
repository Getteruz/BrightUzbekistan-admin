import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import cls from './UserItem.module.scss'

const UserItem = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.item} onClick={() => navigate('/users/1')}>
            <Avatar src='/avatar.png' />
            <div className={cls.item__info}>
                <span className={cls.item__info__name}>Убайдулла Ахмедов</span>
                <span className={cls.item__info__role}>Руководитель</span>
            </div>
        </div>
    );
}

export default UserItem;
