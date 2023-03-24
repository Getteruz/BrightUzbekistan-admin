import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import { useForm } from 'react-hook-form';
import SiteAdd from '../../components/siteAdd/SiteAdd';

const AddNews = () => {
    const Form = useForm({ mode: 'onChange' })

    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content useForm={Form} />
            <RightAside useForm={Form} />
            <SiteAdd />
        </ComponentsWrapper>
    );
}

export default AddNews;
