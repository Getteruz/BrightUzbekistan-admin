import { useEffect } from 'react';
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
    const { setValue, getValues, watch } = useForm
    const [params, setSearchParams] = useSearchParams()
    const { data: categories } = useQuery('categories', getCategories, { cacheTime: Infinity, staleTime: Infinity })
    const watchedFiles = watch()

    const handleCheckboxChange = (e) => {
        let categories = getQueryInArray('categories') || []

        if (e.target.checked) {
            categories = categories.slice(0, 2)
            categories?.push(e.target.value)
        } else {
            categories = categories?.filter(ctg => ctg !== e.target.value)
        }

        if (!categories?.includes(params.get('mainCategory'))) {
            setSearchParams(params.set('mainCategory', categories?.[0] || ''), {
                replace: true
            })
        }

        categories = Array.from(new Set(categories))

        setValue('categories', categories)
        setSearchParams({ ...paramsToObject(params.entries()), 'categories': categories?.join(',') || '' }, { replace: true })
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13 && !!e.target.value?.trim()) {
            const values = getValues()
            const hashtags = values?.[params.get('lang')]?.tags || []
            hashtags.push(e.target.value?.trim())
            setValue(`${params.get('lang')}.tags`, Array.from(new Set(hashtags)))
        }
        if (e.keyCode === 13) {
            e.target.value = ''
        }
    }

    const onTimeChange = (e, b) => {
        const publishedDate = getValues()?.publishDate || Date.now()
        const date = new Date(publishedDate)
        date.setHours(e ? e.$H : 0)
        date.setMinutes(e ? e?.$m : 0)
        setValue('publishDate', date?.toISOString())
    }

    const onDateChange = (e) => {
        const publishedDate = getValues()?.publishDate || Date.now()
        const date = new Date(publishedDate)
        const selectedate = new Date(e?.$d)
        if (e) {
            date.setDate(selectedate?.getDate())
            date.setMonth(selectedate?.getMonth())
            date.setFullYear(selectedate?.getFullYear())
            setValue('publishDate', date?.toISOString())
        } else {
            setValue('publishDate', null)
        }
    }

    useEffect(() => {
        setValue('mainCategory', params.get('mainCategory'))
    }, [params.get('mainCategory')])

    return (
        <RightAsideWrapper>
            <SwitchGroup label='Выберите категорию'>
                <div className={cls.checkbox}>
                    <span className={cls.disabled}>*</span>
                    <Switch
                        label='Последние новости'
                        checked={watchedFiles?.isLastNews}
                        onChange={(e) => setValue('isLastNews', e.target.checked)}
                    />
                </div>
                {
                    categories?.length > 0 && categories.map(ctg =>
                        <div className={cls.checkbox} key={ctg.id}>
                            <span
                                className={params.get('mainCategory') === ctg.id ? cls.active : ""}
                                onClick={() => setSearchParams({ ...paramsToObject(params.entries()), 'mainCategory': ctg.id }, { replace: true })}
                            >*</span>
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
                <Timepicker label='Время' onChange={onTimeChange} value={watchedFiles.publishDate} />
                <Datapicker label='Дата' onChange={onDateChange} value={watchedFiles.publishDate} />
            </DateGroup>
            <Flex gap='15' direction='column'>
                <RoundedInput placeholder='Название тега' label='Теги' onKeyUp={handleKeyUp} />
                <TagsGroup tags={watchedFiles?.[params.get('lang')]?.tags || []} setValue={setValue} />
            </Flex>
        </RightAsideWrapper>
    );
}

export default RightAside;
