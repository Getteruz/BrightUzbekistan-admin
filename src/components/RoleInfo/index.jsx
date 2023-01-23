import cls from './RoleInfo.module.scss'

const RoleInfo = ({title = '', desc = '', label = ''}) => {
    return (
        <div className={cls.card}>
            <h3 className={cls.card__title}>{title}</h3>
            <p className={cls.card__desc}>{desc}</p>
            <button className={cls.card__link}>{label}</button>
        </div>
    );
}

export default RoleInfo;
