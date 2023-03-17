import { Link } from 'react-router-dom';
import cls from './RoleInfo.module.scss'

const RoleInfo = ({
    id = '',
    title = '', 
    desc = '', 
    replaceUrl = true
}) => {
    return (
        <div className={cls.card}>
            <h3 className={cls.card__title}>{title}</h3>
            <p className={cls.card__desc}>{desc}</p>
            <Link to={`/adduser?role=${id}`} className={cls.card__link} replace={replaceUrl}>{`Создать ${title}${title?.at(-1) == 'ь' ? 'я' : 'а'}`}</Link>
        </div>
    );
}

export default RoleInfo;
