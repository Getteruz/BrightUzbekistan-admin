import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import RightAsideWrapper from "../../../../components/Aside/RightAsideWrapper";
import Switch from "../../../../components/Form/Switch";
import SwitchGroup from "../../../../components/SwitchGroup";
import { getPermissions } from "../../../../services/permissions";
import { getRoles } from "../../../../services/roles";
import getQueryInArray from "../../../../utils/getQueryInArray";
import paramsToObject from "../../../../utils/paramsToObject";

const RightAside = ({ useForm = {} }) => {
    const {data: roles} = useQuery('roles', getRoles)
    const {data: permissions} = useQuery('permissions', getPermissions)
    const [params, setSearchParams] = useSearchParams()
    const { setValue} = useForm;

    const handleCheckboxChange = (e) => {
        let permissions = []
        if (e.target.checked) {
            permissions= [...getQueryInArray('permissions'), e.target.value]?.join(',')
        } else {
            permissions = getQueryInArray('permissions')?.filter(permission => permission !== e.target.value)?.join(',')
        }
        setSearchParams({
            ...paramsToObject(params.entries()),
            permissions
        }, {
            replace: true
        })
        setValue('permissions',permissions?.split(','))
    }

    const hanldeRadioChange = (e) => {
        let role = ''
        if (e.target.checked) {
            role = e.target.value
        } else {
            role = ''
        }
        setSearchParams({
            ...paramsToObject(params.entries()),
            role
        },  {
            replace: true
        })
        setValue('role', role)
    }

    return (
        <RightAsideWrapper>
            <SwitchGroup label="Пользовательские роля">
                {roles?.length > 0 && roles.map(role =>
                    <Switch
                        key={role.id}
                        label={role.title}
                        value={role.id}
                        checked={params.get('role') === role.id}
                        onChange={hanldeRadioChange}
                    />
                )}
            </SwitchGroup>
            <SwitchGroup label="Пользовательские функции">
                {permissions?.length > 0 && permissions.map(permission =>
                    <Switch
                        key={permission.id}
                        label={permission.title}
                        value={permission.id}
                        name='permissions'
                        checked={getQueryInArray('permissions')?.includes(permission?.id)}
                        onChange={handleCheckboxChange}
                    />
                )}
            </SwitchGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
