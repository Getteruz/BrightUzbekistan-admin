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
import useSocket from '../../hooks/useSocket';

const EditGeneralAccess = () => {
    const { id } = useParams()
    const socket = useSocket()
    const Form = useForm({ mode: 'onChange' })
    const { data } = useQuery(['news', id], () => getNewsById(id))
    const [params, setSearchParams] = useSearchParams()

    useEffect(() => {
        const categories = data?.categories?.map(ctg => ctg?.id) || []
        setSearchParams({
            ...paramsToObject(params.entries()),
            categories: categories?.join(','),
            mainCategory: data?.mainCategory?.id || '',
            lang: !['uz', 'уз', 'ru', 'en']?.includes(params?.get('lang')) ? 'ru' : params.get('lang')
        }, {
            replace: true
        })
// console.log(data);
        // Form.reset({
        //     ...data,
        //     categories
        // })
    }, [data])

    useEffect(() => {
        socket.emit('create', id)
        socket.on('get_changes', data => {
            console.log(data);
            const categories = data?.categories?.map(ctg => ctg?.id) || []
            Form.reset({
                ...data,
                categories
            })
        })
        return () => socket.emit('leave', id)
    }, [])

    return (
        <ComponentsWrapper>
            <LeftAside useForm={Form} />
            <Content useForm={Form} />
            <RightAside useForm={Form} />
        </ComponentsWrapper>
    );
}

export default EditGeneralAccess;
