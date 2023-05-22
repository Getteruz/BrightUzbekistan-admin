import { useSelector } from "react-redux";
import Loader from "./Loader";

const Loaders = () => {
    const { isOpen, text } = useSelector(state => state.loader)

    return isOpen ? (
        <Loader text={text} />
    ) : <></>
}

export default Loaders;