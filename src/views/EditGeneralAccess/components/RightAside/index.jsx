import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import DateGroup from '../../../../components/DateGroup';
import Flex from '../../../../components/Flex';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import Switch from '../../../../components/Form/Switch';
import Timepicker from '../../../../components/Form/Timepicker';
import SwitchGroup from '../../../../components/SwitchGroup';
import TagsGroup from '../../../../components/TagsGroup';
import useSocket from '../../../../hooks/useSocket';
import { getCategories } from '../../../../services/category';
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './RightAside.module.scss'

const RightAside = ({ useForm = {} }) => {
    const {id} = useParams()
    const socket = useSocket()
    const { user} = useSelector(state => state?.auth)
    const { setValue, getValues, watch } = useForm
    const [params, setSearchParams] = useSearchParams()
    const { data: categories } = useQuery('categories', getCategories)
    const watchedFiles = watch()

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

        if (!categories?.includes(params.get('mainCategory'))) {
            setSearchParams(params.set('mainCategory', categories?.find(ctg => ctg !== import.meta.env.VITE_LAST_NEWS_ID) || ''), {
                replace: true
            })
            // socket.emit('change', {roomId: id, userId: user?.id, inputName: 'mainCategory', value: categories?.find(ctg => ctg !== import.meta.env.VITE_LAST_NEWS_ID)?.id || ''})
        }

        categories = Array.from(new Set(categories))

        setValue('categories', categories)
        setSearchParams({ ...paramsToObject(params.entries()), 'categories': categories?.join(',') || '' }, { replace: true })
        // socket.emit('change', {roomId: id, value: categories, inputName: 'categories', userId: user?.id})
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13 && !!e.target.value?.trim()) {
            const values = getValues()
            const hashtags = values?.[params.get('lang')]?.tags || []
            hashtags.push(e.target.value?.trim())
            setValue(`${params.get('lang')}.hashtags`, Array.from(new Set(hashtags)))
        }
        if (e.keyCode === 13) {
            e.target.value = ''
        }
    }

    const onTimeChange = (e) => {
        if (e) {
            console.log(e);
            const publishedDate = getValues()?.publishDate || Date.now()
            const date = new Date(publishedDate)
            date.setTime(e?.$d)
            setValue('publishDate', date?.toISOString())
        }
    }

    const onDateChange = (e) => {
        if (e) {
            const publishedDate = getValues()?.publishDate || Date.now()
            const date = new Date(publishedDate)
            const selectedate = new Date(e.$d)
            date.setDate(selectedate?.getDate())
            date.setMonth(selectedate?.getMonth())
            setValue('publishDate', date?.toISOString())
        }
    }

    useEffect(() => {
        setValue('mainCategory', params.get('mainCategory'))
        socket.emit('change', {roomId: id, userId: user?.id, inputName: 'mainCategory', value: params.get('mainCategory')})
    }, [params.get('mainCategory')])

    useEffect(() => {
        socket.emit('change', {roomId: id, userId: user?.id, inputName: 'categories', value:params.get('categories')?.split(',')})
    }, [params.get('categories')])

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
                                        className={params.get('mainCategory') === ctg.id ? cls.active : ""}
                                        onClick={() => setSearchParams({ ...paramsToObject(params.entries()), 'mainCategory': ctg.id }, { replace: true })}
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
                <Timepicker label='Время' onChange={onTimeChange} defaultValue={watchedFiles?.publishDate} />
                <Datapicker label='Дата' onChange={onDateChange} />
            </DateGroup>
            <Flex gap='15' direction='column'>
                <RoundedInput placeholder='Название тега' label='Теги' onKeyUp={handleKeyUp} />
                <TagsGroup tags={getValues()?.[params.get('lang')]?.tags || []} setValue={setValue} />
            </Flex>
        </RightAsideWrapper>
    );
}

export default RightAside;
