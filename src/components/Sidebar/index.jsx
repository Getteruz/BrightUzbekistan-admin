import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { LogOutIcon } from '../icons';
import { links } from './data';
import cls from './Sidebar.module.scss'


const Sidebar = () => {
    const x = useRef()
    const iconRef = useRef()
    const router = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleClick = (e) => {
            if (!x.current.contains(e.target)) {
                x.current.classList.remove(cls.openmadal)
            } else if (iconRef.current === e.target) {
                x.current.classList.add(cls.openmadal)
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick)
    }, [])

    const Logout = async () => {
        try {
            await logout()
            navigate('/auth')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <aside ref={x} className={cls.sidebar}>
            <img className={cls.sidebar__img} src="/Logo.svg" alt="Bright Uzbekistan" />
            <img ref={iconRef} className={cls.sidebar__img2} src="/Vector.svg" alt="Bright Uzbekistan" />
            <Link className={cls.sidebar__helplink} to='/'>Как создать?</Link>
            <div className={cls.sidebar__list}>
                {
                    links?.length > 0 && links.map(link =>
                        <Link
                            key={link.id}
                            to={link.link}
                            className={`${cls.sidebar__link} ${router.pathname.split('/')?.slice(0, 2)?.join('/') === link.link?.split('/')?.slice(0, 2)?.join('/') ? cls.active : ''}`}
                        >
                            {typeof link.icon === 'function' && link.icon()}
                            {link.label}
                        </Link>
                    )
                }
            </div>
            <div className={cls.sidebar__list2}>
                {
                    links?.length > 0 && links.map(link =>
                        <Link
                            key={link.id}
                            to={link.link}
                            className={`${cls.sidebar__link} ${router.pathname.split('/')?.slice(0, 2)?.join('/') === link.link?.split('/')?.slice(0, 2)?.join('/') ? cls.active : ''}`}
                        >
                            {typeof link.icon === 'function' && link.icon()}

                        </Link>
                    )
                }
            </div>
            <button className={cls.sidebar__button} onClick={Logout}>
                <LogOutIcon /> Выход
            </button>
            <button className={cls.sidebar__button2} onClick={Logout}>
                <LogOutIcon />
            </button>
        </aside>
    );
}

export default Sidebar;