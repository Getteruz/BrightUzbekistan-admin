import Avatar from '../../../../components/Avatar';
import Flex from '../../../../components/Flex';
import Switch from '../../../../components/Form/Switch';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import SwitchGroup from '../../../../components/SwitchGroup';
import DateGroup from '../../../../components/DateGroup';
import { useNavigate } from 'react-router-dom';

const RightAside = () => {
    const navigate = useNavigate()
    const query = new URLSearchParams(window.location.search);

    const hanldeRadioChange = (e) => {
        if (e.target.checked) {
            query.set('sort', e.target.value)
        } else {
            query.set('sort', '')
        }
        navigate(`?${query.toString()}`, { replace: true })
    }
    return (
        <RightAsideWrapper>
            <Flex direction='column' gap='15'>
                <RoundedInput placeholder='username' label='По пользователю' />
                <Flex gap='7' rowCount={4}>
                    {/* <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' />
                    <Avatar src='/avatar.png' /> */}
                </Flex>
            </Flex>
            <SwitchGroup label='Сортировка'>
                <Switch
                    label='Неделе'
                    value='Неделе'
                    checked={query.get('sort') === 'Неделе'}
                    onChange={(e) => hanldeRadioChange(e, 'Неделе')}
                />
                <Switch
                    label='Месяц'
                    value='Месяц'
                    checked={query.get('sort') === 'Месяц'}
                    onChange={(e) => hanldeRadioChange(e)}
                />
                <Switch
                    label='Год'
                    value='Год'
                    checked={query.get('sort') === 'Год'}
                    onChange={(e) => hanldeRadioChange(e)}
                />
            </SwitchGroup>
            <DateGroup label='По дате'>
                <Datapicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
