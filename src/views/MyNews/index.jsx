import ComponentsWrapper from "../../components/ComponentsWrapper";
import SiteAdd from "../../components/siteAdd/SiteAdd";
import Content from "./components/Content";
import LeftAside from "./components/LeftAside";
import RightAside from "./components/RightAside";


const MyNews = () => {
    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content />
            <RightAside />
            <SiteAdd />
        </ComponentsWrapper>
    );
}

export default MyNews;
