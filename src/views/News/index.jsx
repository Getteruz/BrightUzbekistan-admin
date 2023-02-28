import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { useForm } from 'react-hook-form';

const AddNews = () => {
    const { register, formState: { errors, isValid }, handleSubmit, setValue } = useForm({ mode: 'onChange' })

    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content register={register} handleSubmit={handleSubmit} />
            <RightAside register={register} setValue={setValue} />
        </ComponentsWrapper>
    );
}

export default AddNews;
