import ContentWrapper from '../../components/ContentWrapper';
import RichText from '../../components/Form/RichText';
import RightAside from '../Main/Components/RightAside';
import LeftAside from './components/LeftAside';
import cls from './News.module.scss'

const News = () => {
    return (
        <ContentWrapper>
            <LeftAside />
            <div style={{maxHeight: '500px'}}>
                <RichText />
            </div>
            <RightAside />
        </ContentWrapper>
    );
}

export default News;
