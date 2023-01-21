import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import DateGroup from '../../../../components/DateGroup';
import Flex from '../../../../components/Flex';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import Switch from '../../../../components/Form/Switch';
import Timepicker from '../../../../components/Form/Timepicker';
import SwitchGroup from '../../../../components/SwitchGroup';
import TagsGroup from '../../../../components/TagsGroup';

const RightAside = () => {
    return (
        <RightAsideWrapper>
            <SwitchGroup label='Выберите категорию'>
                <Switch label='Последние новости' />
                <Switch label='Мир' />
                <Switch label='Экономика' />
                <Switch label='Политика' />
                <Switch label='Общество' />
                <Switch label='Бизнес' />
                <Switch label='Спорт' />
            </SwitchGroup>
            <DateGroup label='Дата публикации'>
                <Timepicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
            <Flex gap='15' direction='column'>
                <RoundedInput placeholder='Название тега' label='Теги' />
                <TagsGroup tags={['# Узбекистан', '# Таможня', '# Шавкат Мирзиёев', '# Экономика']} />
            </Flex>
        </RightAsideWrapper>
    );
}

export default RightAside;
