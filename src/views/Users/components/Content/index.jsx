import RoleInfo from "../../../../components/RoleInfo";
import { roles } from "./data";

const Content = () => {
    return (
        <div>
            {
                roles?.length > 0 && roles.map(role => 
                    <RoleInfo key={role.id} title={role.title} desc={role.desc} label={role.label   } />    
                )
            }
        </div>
    );
}

export default Content;
