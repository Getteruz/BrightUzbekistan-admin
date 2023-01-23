import ComponentsWrapper from "../../components/ComponentsWrapper";
import LeftAside from "./components/LeftAside";
import { Outlet } from "react-router-dom";

const Users = () => {
    return (
        <ComponentsWrapper>
            <LeftAside />
            <Outlet />
        </ComponentsWrapper>
    );
}

export default Users;
