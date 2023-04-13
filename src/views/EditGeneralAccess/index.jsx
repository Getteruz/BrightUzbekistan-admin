import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { useEffect } from 'react';
import paramsToObject from '../../utils/paramsToObject';
import useSocket from '../../hooks/useSocket';

const EditGeneralAccess = () => {
    const { id } = useParams()
    const socket = useSocket()
    const Form = useForm({ mode: 'onChange' })
    const [params, setSearchParams] = useSearchParams()

    useEffect(() => {
        setSearchParams({
            ...paramsToObject(params.entries()),
            lang: !['uz', 'уз', 'ru', 'en']?.includes(params?.get('lang')) ? 'ru' : params.get('lang')
        }, {
            replace: true
        })
    }, [])

    useEffect(() => {
        socket.emit('create', id)
        socket.on('get_changes', async data => {
            const categories = data?.categories?.map(ctg => ctg?.id) || []
            const mainCategory = data?.mainCategory?.id || ''
            Form.reset({
                ...data,
                categories,
                mainCategory
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
