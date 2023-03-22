import { useQuery } from "react-query";
import RoleInfo from "../../../../components/RoleInfo";
import { getRoles } from "../../../../services/roles";
// import { roles } from "./data";
import cls from './Roles.module.scss'

const Roles = () => {
    const {data: roles} = useQuery('roles', getRoles)

    return (
        <div className={cls.box}>
            <span>Информация о ролях</span>
            <div>
                {
                    roles?.length > 0 && roles.map(role =>
                        <RoleInfo 
                            key={role.id} 
                            id={role.id}
                            title={role.title} 
                            desc={role.description} 
                            replaceUrl={false}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Roles;
