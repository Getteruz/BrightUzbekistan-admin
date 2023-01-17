import ContentWrapper from '../../components/ContentWrapper';
import LeftAside from './Components/LeftAside';
import RightAside from './Components/RightAside';
import cls from './Main.module.scss'

const Main = () => {
    return (
        <ContentWrapper>
            <LeftAside />
            <div></div>
            <RightAside />
        </ContentWrapper>
    );
}

export default Main;
