import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
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
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './RightAside.module.scss'

const RightAside = ({ useForm = {} }) => {
    const { setValue } = useForm
    const [hashTags, setHashtags] = useState([])
    const [activeCtg, setActiveCtg] = useState()
    const [params, setSearchParams] = useSearchParams()
    const { data: categories } = useQuery('categories', getCategories)

    const handleCheckboxChange = (e) => {
        let categories = getQueryInArray('categories') || []

        if (e.target.checked) {
            categories = categories.slice(
                0,
                categories.some(ctg => ctg === import.meta.env.VITE_LAST_NEWS_ID || e.target.value === import.meta.env.VITE_LAST_NEWS_ID) ? 3 : 2)
            categories?.push(e.target.value)
        } else {
            categories = categories?.filter(ctg => ctg !== e.target.value)
        }

        if (!categories?.includes(activeCtg)) {
            setActiveCtg(categories?.find(ctg => ctg !== import.meta.env.VITE_LAST_NEWS_ID))
        }

        setValue('categories', categories)
        setSearchParams({ ...paramsToObject(params.entries()), 'categories': categories?.join(',') || '' }, { replace: true })
    }

    useEffect(() => {
        setValue('hashtags', hashTags)
    }, [hashTags]);

    return (
        <RightAsideWrapper>
            <SwitchGroup label='Выберите категорию'>
                {
                    categories?.length > 0 && categories.map(ctg =>
                        <div className={cls.checkbox} key={ctg.id}>
                            {
                                getQueryInArray('categories')?.some(category => category == ctg.id) &&
                                    ctg.id !== import.meta.env.VITE_LAST_NEWS_ID ? (
                                    <span
                                        className={activeCtg === ctg.id ? cls.active : ""}
                                        onClick={() => setActiveCtg(ctg.id)}
                                    >*</span>
                                ) : (
                                    <span className={cls.disabled}>*</span>
                                )
                            }
                            <Switch
                                key={ctg.id}
                                onChange={handleCheckboxChange}
                                checked={getQueryInArray('categories')?.some(category => category === ctg.id)}
                                value={ctg.id}
                                label={ctg.ru}
                            />
                        </div>
                    )
                }
            </SwitchGroup>
            <DateGroup label='Дата публикации'>
                <Timepicker label='Время' />
                <Datapicker label='Дата' />
            </DateGroup>
            <Flex gap='15' direction='column'>
                <RoundedInput placeholder='Название тега' label='Теги' setHashtags={setHashtags} />
                <TagsGroup tags={hashTags} setHashtags={setHashtags} />
            </Flex>
        </RightAsideWrapper>
    );
}

export default RightAside;
