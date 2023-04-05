import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { useForm } from 'react-hook-form';
import { getFromLocalStorage } from '../../utils/localStorageService';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import paramsToObject from '../../utils/paramsToObject';
import getQueryInArray from '../../utils/getQueryInArray';

const AddNews = () => {
    const Form = useForm({ mode: 'onChange', defaultValues: getFromLocalStorage('new_news', {isLastNews: true}) })
    const [params, setSearchParams] = useSearchParams()

    useEffect(() => {
        const oldValue = getFromLocalStorage('new_news', {isLastNews: true})
        let categories = getQueryInArray('categories') || []
        let mainCategory = ''
        if(oldValue?.categories?.length > 0) {
            categories = [oldValue?.categories]
            mainCategory = oldValue?.mainCategory
        }
        setSearchParams({
            ...paramsToObject(params.entries()),
            'categories': categories?.join(','),
            lang: ['uz', 'ru', 'en', 'уз']?.includes(params.get('lang')) ? params.get('lang') : 'uz',
            mainCategory
        }, { replace: true })
        Form.setValue('categories', getQueryInArray('categories') || [])
    }, [])

    return (
        <ComponentsWrapper>
            <LeftAside useForm={Form} />
            <Content useForm={Form} />
            <RightAside useForm={Form} />
        </ComponentsWrapper>
    );
}

export default AddNews;
