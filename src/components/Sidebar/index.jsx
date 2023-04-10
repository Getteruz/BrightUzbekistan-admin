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
    const wrap = useRef()
    const wrap2 = useRef()
    const btnWrap = useRef()
    useEffect(() => {
        const handleClick = (e) => {
            if (!x.current.contains(e.target)) {
                x.current.classList.remove(cls.openmadal)
            } else if (iconRef.current === e.target) {
                x.current.classList.add(cls.openmadal)
            }
            // if (!wrap2.current.contains(e.target) && btnWrap.current !== e.target) {
            //     wrap.current.classList.remove(cls.openmadal2)
            // } else if (btnWrap.current === e.target) {
            //     wrap.current.classList.add(cls.openmadal2)
            // }

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
            <button ref={btnWrap} className={cls.sidebar__button} onClick={() => wrap.current.classList.add(cls.openmadal2)} >
                <LogOutIcon /> Выход
            </button>
            <button ref={btnWrap} className={cls.sidebar__button2} onClick={() => wrap.current.classList.add(cls.openmadal2)}>
                <LogOutIcon />
            </button>
            <div ref={wrap} className={cls.logOut__boxshodow} >
                <div ref={wrap2} className={cls.logOut__wrapp}>
                    <p className={cls.logOut__text}>Вы действительно хотите выйти?</p>
                    <div>
                        <button className={cls.logOut__btn} onClick={Logout}>я вернусь позже</button>
                        <button className={cls.logOut__btn2} onClick={() => wrap.current.classList.remove(cls.openmadal2)}>Это было случайно</button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;