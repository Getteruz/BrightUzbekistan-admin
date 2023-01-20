import { useNavigate } from 'react-router-dom';
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import Flex from '../../../../components/Flex';
import { LeftIcon } from '../../../../components/icons';
import cls from './LeftAside.module.scss'

const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <div className={cls.aside}>
            <RoundedButton className={cls.aside__btn} onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <button className={cls.aside__link}>Мои новости</button>
                <button className={cls.aside__link}>Сохранённые</button>
                <button className={cls.aside__link}>Избранные</button>
                <button className={cls.aside__link}>Архив</button>
                <button className={cls.aside__link}>Общество</button>
                <button className={cls.aside__link}>Спорт</button>
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start' style={{ marginTop: 'auto', }}>
                <button className={cls.aside__link}>Как создать?</button>
                <button className={cls.aside__link} style={{ opacity: 0.4 }}>Последние новости</button>
            </Flex>
        </div>
    );
}

export default LeftAside;
