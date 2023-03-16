import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { useForm } from 'react-hook-form';

const EditNews = () => {
    const { register, formState: { errors, isValid }, handleSubmit, setValue, getValues } = useForm({ mode: 'onChange' })

    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content register={register} handleSubmit={handleSubmit} setValue={setValue} />
            <RightAside register={register} setValue={setValue} getValues={getValues} />
        </ComponentsWrapper>
    );
}

export default EditNews;
