import ContentWrapper from '../../components/ContentWrapper';
import Content from './Components/Content';
import LeftAside from './Components/LeftAside';
import RightAside from './Components/RightAside';

const Main = () => {
    return (
        <ContentWrapper>
            <LeftAside />
            <Content />
            <RightAside />
        </ContentWrapper>
    );
}

export default Main;
