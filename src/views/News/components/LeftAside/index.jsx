import { useNavigate } from 'react-router-dom';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import Flex from '../../../../components/Flex';
import { LeftIcon } from '../../../../components/icons';

const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <LeftAsideWrapper>
            <RoundedButton onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <SimpleButton>Мои новости</SimpleButton>
                <SimpleButton>Сохранённые</SimpleButton>
                <SimpleButton>Избранные</SimpleButton>
                <SimpleButton>Архив</SimpleButton>
                <SimpleButton>Общество</SimpleButton>
                <SimpleButton>Спорт</SimpleButton>
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'   >
                <SimpleButton>Как создать?</SimpleButton>
                <SimpleButton light={true}>Последние новости</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
