import Avatar from '../Avatar';
import cls from './UserItem.module.scss'

const UserItem = () => {
    return (
        <div className={cls.item}>
            <Avatar src='/avatar.png' />
            <div className={cls.item__info}>
                <span className={cls.item__info__name}>Убайдулла Ахмедов</span>
                <span className={cls.item__info__role}>Руководитель</span>
            </div>
        </div>
    );
}

export default UserItem;
