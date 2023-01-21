import Flex from '../../Flex';
import Instagram from './Buttons/Instagram';
import Telegram from './Buttons/Telegram';
import Card from './Card';
import cls from './NewsDropdown.module.scss'

const NewsDropdown = () => {
    return (
        <div className={cls.box}>
            <p className={cls.box__info}>Количество новост для публикации: 4</p>
            <Flex direction='column' gap='15'>
                <Card />
                <Card />
                <Card />
            </Flex>
            <div className={cls.box__btnwrapper}>
                <Telegram label='rcyvguhbi' />
                <Instagram label='rcyvguhbi' />
            </div>
        </div>
    );
}

export default NewsDropdown;
