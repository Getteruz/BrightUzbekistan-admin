import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import MessageButton from '../Buttons/MessageButton';
import WhiteButton from '../Buttons/WhiteButton';
import Container from '../Container';
import ProfileDrobdown from '../Drobdowns/ProfileDrobdown';
import Wrapper from '../Drobdowns/Wrapper';
import { SearchIcon } from '../icons';
import cls from './Navbar.module.scss'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

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
                    <WhiteButton>id: 98234-ad33</WhiteButton>
                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsOpen(state => !state)}>
                        <Avatar src='/avatar.png' />
                        <Wrapper bottom='-10px'>
                            {isOpen && <ProfileDrobdown />}
                        </Wrapper>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;
