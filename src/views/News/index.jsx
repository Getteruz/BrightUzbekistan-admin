import ContentWrapper from '../../components/ContentWrapper';
import RichText from '../../components/Form/RichText';
import RightAside from './components/RightAside';
import LeftAside from './components/LeftAside';
import cls from './News.module.scss'
import Content from './components/Content';

const News = () => {
    return (
        <ContentWrapper>
            <LeftAside />
            <Content />
            <RightAside />
        </ContentWrapper>
    );
}

export default News;
