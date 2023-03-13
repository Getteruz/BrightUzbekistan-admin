import { Link } from 'react-router-dom';
import cls from './RoleInfo.module.scss'

const RoleInfo = ({
    title = '', 
    desc = '', 
    label = '', 
    roleId = '',
    replaceUrl = true
}) => {
    return (
        <div className={cls.card}>
            <h3 className={cls.card__title}>{title}</h3>
            <p className={cls.card__desc}>{desc}</p>
            <Link to={`/adduser?role=${roleId}`} className={cls.card__link} replace={replaceUrl}>{label}</Link>
        </div>
    );
}

export default RoleInfo;
