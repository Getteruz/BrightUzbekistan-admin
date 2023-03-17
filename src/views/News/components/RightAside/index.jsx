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

const RightAside = ({ useForm = {} }) => {
    const { setValue, getValues } = useForm
    const [hashTags, setHashtags] = useState([])
    const { data: categories } = useQuery('categories', getCategories)

    const handleCheckboxChange = (e) => {
        const values = getValues()
        const categories = values?.categories || []
        if (e.target.checked) {
            setValue('categories', [...categories, e.target.value])
        } else {
            setValue('categories', categories?.filter(category => category !== e.target.value))
        }
    }

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
                            onChange={handleCheckboxChange}
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
