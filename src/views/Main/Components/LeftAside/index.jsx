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
                <SimpleButton style={{fontWeight: 500}}>Последние новости</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Мир</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Экономика</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Бизнес</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Общество</SimpleButton>
                <SimpleButton style={{fontWeight: 500}}>Спорт</SimpleButton>
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
                <SimpleButton style={{fontWeight: 500}}>Создать категорию!</SimpleButton>
                <SimpleButton style={{fontWeight: 500}} light={true}>Помощь!</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
