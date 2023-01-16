import Avatar from '../Avatar';
import MessageButton from '../Buttons/MessageButton';
import WhiteButton from '../Buttons/WhiteButton';
import Container from '../Container';
import { SearchIcon } from '../icons';
import cls from './Navbar.module.scss'

const Navbar = () => {
    return (
        <div className={cls.nav}>
            <Container className={cls.nav__container}>
                <label className={cls.nav__label}>
                    <SearchIcon />
                    <input className={cls.nav__input} type="text" placeholder="Поиск" />
                </label>
                <div className={cls.nav__btns}>
                    <MessageButton className={cls.nav__msg__btn} active />
                    <WhiteButton>id: 98234-ad33</WhiteButton>
                    <Avatar src='/avatar.png' />
                </div>
            </Container>
        </div>
    );
}

export default Navbar;
