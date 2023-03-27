import { useNavigate } from 'react-router-dom';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import Flex from '../../../../components/Flex';
import { LeftIcon } from '../../../../components/icons';
import UsersGroup from '../../../../components/UsersGroup';

const LeftAside = ({ useForm }) => {
    const navigate = useNavigate()
    const { getValues } = useForm
    const value = getValues()

    return (
        <LeftAsideWrapper>
            <RoundedButton onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <UsersGroup label='Создатель' users={[value?.creator]} />
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
                <SimpleButton>Как создать?</SimpleButton>
                <SimpleButton light={true}>Последние новости</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
