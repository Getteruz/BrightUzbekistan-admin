import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { getNewsById } from '../../services/news';
import { useEffect } from 'react';
import paramsToObject from '../../utils/paramsToObject';

const EditNews = () => {
    const { id } = useParams()
    const { data } = useQuery(['news', id], () => getNewsById(id))
    const [params, setSearchParams] = useSearchParams()
    const Form = useForm({ mode: 'onChange' })

    useEffect(() => {
        const categories = data?.categories?.map(ctg => ctg.id) || []
        setSearchParams({
            ...paramsToObject(params.entries()),
            categories: categories?.join(','),
            mainCategory: data?.mainCategory?.id || '',
            lang: !['uz', 'уз', 'ru', 'en']?.includes(params?.get('lang')) ? 'ru' : params.get('lang')
        }, {
            replace: true
        })

        Form.reset({
            ...data,
            categories
        })
    }, [data])

    return (
        <ComponentsWrapper>
            <LeftAside useForm={Form} />
            <Content useForm={Form} />
            <RightAside useForm={Form} />
        </ComponentsWrapper>
    );
}

export default EditNews;
