import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../services/auth';
import { LogOutIcon } from '../icons';
import { links } from './data';
import cls from './Sidebar.module.scss'


const Sidebar = () => {
    const router = useLocation()

    return (
        <aside className={cls.sidebar}>
            <img src="/Logo.svg" alt="Bright Uzbekistan" />
            <Link className={cls.sidebar__helplink} to='/'>Как создать?</Link>
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
            <button className={cls.sidebar__button}>
                <LogOutIcon /> Выход
            </button>
            <button className={cls.sidebar__button2}>
                <LogOutIcon />
            </button>
        </aside>
    );
}

export default Sidebar;
