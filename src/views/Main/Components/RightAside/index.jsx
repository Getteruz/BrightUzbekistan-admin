import Avatar from '../../../../components/Avatar';
import Flex from '../../../../components/Flex';
import Switch from '../../../../components/Form/Switch';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import SwitchGroup from '../../../../components/SwitchGroup';
import DateGroup from '../../../../components/DateGroup';

const RightAside = () => {
    return (
        <RightAsideWrapper>
            <Flex direction='column' gap='15'>
                <RoundedInput placeholder='username' label='По пользователю' />
                <Flex gap='7' rowCount={4}>
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                </Flex>
            </Flex>
            <SwitchGroup label='Сортировка'>
                <Switch label='Неделе' name='sort' />
                <Switch label='Месяц' name='sort' />
                <Switch label='Год' name='sort' />
            </SwitchGroup>
            <DateGroup label='По дате'>
                <Datapicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
