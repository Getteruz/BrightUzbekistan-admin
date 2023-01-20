import { useNavigate } from 'react-router-dom';
import WhiteButton from '../../../../components/Buttons/WhiteButton';
import Flex from '../../../../components/Flex';
import { PlusIcon } from '../../../../components/icons';
import cls from './LeftAside.module.scss'

const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.aside}>
            <WhiteButton className={cls.aside__btn} onClick={() => navigate('/news')}>
                <PlusIcon />
                Добавить новости
            </WhiteButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <button className={cls.aside__link}>Последние новости</button>
                <button className={cls.aside__link}>Мир</button>
                <button className={cls.aside__link}>Экономика</button>
                <button className={cls.aside__link}>Бизнес</button>
                <button className={cls.aside__link}>Общество</button>
                <button className={cls.aside__link}>Спорт</button>
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start' style={{ marginTop: 'auto', }}>
                <button className={cls.aside__link}>Создать категорию!</button>
                <button className={cls.aside__link} style={{ opacity: 0.4 }}>Помощь!</button>
            </Flex>
        </div>
    );
}

export default LeftAside;
