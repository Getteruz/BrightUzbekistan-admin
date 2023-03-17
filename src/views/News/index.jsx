import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { useForm } from 'react-hook-form';

const AddNews = () => {
    const Form = useForm({ mode: 'onChange' })

    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content useForm={Form} />
            <RightAside useForm={Form} />
        </ComponentsWrapper>
    );
}

export default AddNews;
