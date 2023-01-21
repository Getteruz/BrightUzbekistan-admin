import ComponentsWrapper from "../../components/ComponentsWrapper";
import NewsDropdown from "../../components/Drobdowns/NewsDropdown";
import Wrapper from "../../components/Drobdowns/Wrapper";
import Content from "./components/Content";
import LeftAside from "./components/LeftAside";


const Messages = () => {
    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content />
            <div style={{position: 'relative'}}>
                <Wrapper>
                    <NewsDropdown />
                </Wrapper>
            </div>
        </ComponentsWrapper>
    );
}

export default Messages;
