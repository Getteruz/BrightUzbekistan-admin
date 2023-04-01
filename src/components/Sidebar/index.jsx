import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { LogOutIcon } from '../icons';
import { links } from './data';
import cls from './Sidebar.module.scss'

const Sidebar = () => {
    const router = useLocation()
    const navigate = useNavigate()

    const userLogout = async() => {
        try {
            console.log(1);
            await logout()
            navigate('/auth')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <aside className={cls.sidebar}>
            <img src="/Logo.svg" alt="Bright Uzbekistan" />
            <div className={cls.sidebar__list}>
                {
                    links?.length > 0 && links.map(link =>
                        <Link
                            key={link.id} 
                            to={link.link} 
                            className={`${cls.sidebar__link} ${router.pathname.split('/')?.slice(0, 2)?.join('/') === link.link?.split('/')?.slice(0,2)?.join('/') ? cls.active : ''}`}
                        >
                            {typeof link.icon === 'function' && link.icon()} 
                            {link.label}
                        </Link>    
                    )
                }
            </div>
            <button className={cls.sidebar__button} onClick={userLogout}>
                <LogOutIcon /> Выход
            </button>
        </aside>
    );
}

export default Sidebar;
