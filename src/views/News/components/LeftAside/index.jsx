import { useNavigate } from 'react-router-dom';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import Flex from '../../../../components/Flex';
import { LeftIcon } from '../../../../components/icons';
import cls from './LeftAside.module.scss'

const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <LeftAsideWrapper>
            <RoundedButton className={cls.aside__btn} onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <SimpleButton style={{fontWeight: 500}}>Мои новости</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Сохранённые</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Избранные</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Архив</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Общество</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Спорт</SimpleButton>
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'   >
                <SimpleButton style={{fontWeight: 500}}>Как создать?</SimpleButton>
                <SimpleButton style={{fontWeight: 500}} light={true}>Последние новости</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
