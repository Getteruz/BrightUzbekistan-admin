import ContentWrapper from '../../components/ContentWrapper';
import ListItem from '../../components/ListItem';
import LeftAside from './Components/LeftAside';
import RightAside from './Components/RightAside';
import cls from './Main.module.scss'

const Main = () => {
    return (
        <ContentWrapper>
            <LeftAside />
            <div>
                <ListItem />
            </div>
            <RightAside />
        </ContentWrapper>
    );
}

export default Main;
