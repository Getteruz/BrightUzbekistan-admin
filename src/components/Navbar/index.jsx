import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import LetterAvatar from 'react-lettered-avatar'
import Avatar from '../Avatar';
import MessageButton from '../Buttons/MessageButton';
import WhiteButton from '../Buttons/WhiteButton';
import Container from '../Container';
import ProfileDrobdown from '../Drobdowns/ProfileDrobdown';
import Wrapper from '../Drobdowns/Wrapper';
import { SearchIcon } from '../icons';
import cls from './Navbar.module.scss'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)

    const handleClick = () => {
        navigate(`/users/${user?.id}`)
    }

    return (
        <div className={cls.nav} id='navbar'>
            <Container className={cls.nav__container}>
                <label className={cls.nav__label}>
                    <SearchIcon />
                    <input className={cls.nav__input} type="text" placeholder="Поиск" />
                </label>
                <div className={cls.nav__btns}>
                    <MessageButton className={cls.nav__msg__btn} 
                        active={location.pathname === '/messages'}
                        onClick={() => navigate('/messages')}
                        notification 
                    />
                    <WhiteButton>{user?.fullName}</WhiteButton>
                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleClick}>
                        {user?.avatar ? 
                            <Avatar src={user?.avatar} /> : 
                            <LetterAvatar size={40} name={user?.fullName}/>}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;
