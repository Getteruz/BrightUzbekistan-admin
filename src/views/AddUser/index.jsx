import { useForm } from "react-hook-form";
import ComponentsWrapper from "../../components/ComponentsWrapper";
import Loader from "../../components/Loader";
import Content from "./components/Content";
import LeftAside from "./components/LeftAside";
import RightAside from "./components/RightAside";

const AddUser = () => {
    const form = useForm({ 
        mode: 'onChange', 
        defaultValues: { 
            permissions: [], 
            role: '', 
            avatar: null 
        }
    })

    return (
        <ComponentsWrapper>
            <LeftAside />
            <Content useForm={form} />
            <RightAside useForm={form} />
        </ComponentsWrapper>
    );
}

export default AddUser;
