import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import Content from './components/Content';
import ComponentsWrapper from '../../components/ComponentsWrapper';

const AddNews = () => {
    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content />
            <RightAside />
        </ComponentsWrapper>
    );
}

export default AddNews;
