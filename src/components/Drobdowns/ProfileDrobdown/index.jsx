import cls from './ProfileDrobdown.module.scss'

const ProfileDrobdown = () => {
    return (
        <div className={cls.block}>
            <div className={cls.block__list}>
                <button className={cls.block__button}>Мои новости</button>
                <button className={cls.block__button}>Сохранённые</button>
                <button className={cls.block__button}>Избранные</button>
                <button className={cls.block__button}>Архив</button>
            </div>
            <button className={cls.block__logout}>Выход</button>
        </div>
    );
}

export default ProfileDrobdown;
