import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import DateGroup from '../../../../components/DateGroup';
import Flex from '../../../../components/Flex';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import Switch from '../../../../components/Form/Switch';
import Timepicker from '../../../../components/Form/Timepicker';
import SwitchGroup from '../../../../components/SwitchGroup';
import TagsGroup from '../../../../components/TagsGroup';
import { getCategories } from '../../../../services/category';

const RightAside = ({ register, setValue }) => {
    const [hashTags, setHashtags] = useState([])
    const { data: categories } = useQuery('categories', getCategories)

    useEffect(() => {
        setValue('hashtags', hashTags)
    }, [hashTags]);

    return (
        <RightAsideWrapper>
            <SwitchGroup label='Выберите категорию'>
                {
                    categories?.length > 0 && categories.map(ctg =>
                        <Switch
                            key={ctg.id}
                            register={{ ...register('categories') }}
                            value={ctg.id}
                            label={ctg.ru}
                        />
                    )
                }
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
