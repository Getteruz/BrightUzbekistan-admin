import { useNavigate } from 'react-router-dom';
import WhiteButton from '../../../../components/Buttons/WhiteButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton'
import Flex from '../../../../components/Flex';
import { PlusIcon } from '../../../../components/icons';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';

const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <LeftAsideWrapper>
            <WhiteButton onClick={() => navigate('/news')}>
                <PlusIcon />
                Добавить новости
            </WhiteButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <SimpleButton>Последние новости</SimpleButton>
                <SimpleButton>Мир</SimpleButton>
                <SimpleButton>Экономика</SimpleButton>
                <SimpleButton>Бизнес</SimpleButton>
                <SimpleButton>Общество</SimpleButton>
                <SimpleButton>Спорт</SimpleButton>
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
                <SimpleButton light={true}>Как создать?</SimpleButton>
                <SimpleButton>Вы вошли как редактор</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;