import { useEffect } from 'react';
import { useState } from 'react';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import DateGroup from '../../../../components/DateGroup';
import Flex from '../../../../components/Flex';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import Switch from '../../../../components/Form/Switch';
import Timepicker from '../../../../components/Form/Timepicker';
import SwitchGroup from '../../../../components/SwitchGroup';
import TagsGroup from '../../../../components/TagsGroup';

const RightAside = ({register, setValue}) => {
    const [hashTags, setHashtags] = useState([])

    useEffect(() => {
        setValue('hashtags', hashTags)
    }, [hashTags]);
    
    return (
        <RightAsideWrapper>
            <SwitchGroup label='Выберите категорию'>
                <Switch register={{...register('categories')}} value='Последние новости' label='Последние новости' />
                <Switch register={{...register('categories')}} value='Мир' label='Мир' />
                <Switch register={{...register('categories')}} value='Экономика' label='Экономика' />
                <Switch register={{...register('categories')}} value='Политика' label='Политика' />
                <Switch register={{...register('categories')}} value='Общество' label='Общество' />
                <Switch register={{...register('categories')}} value='Бизнес' label='Бизнес' />
                <Switch register={{...register('categories')}} value='Спорт' label='Спорт' />
            </SwitchGroup>
            <DateGroup label='Дата публикации'>
                <Timepicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
            <Flex gap='15' direction='column'>
                <RoundedInput placeholder='Название тега' label='Теги' setHashtags={setHashtags} />
                <TagsGroup tags={hashTags} />
            </Flex>
        </RightAsideWrapper>
    );
}

export default RightAside;
