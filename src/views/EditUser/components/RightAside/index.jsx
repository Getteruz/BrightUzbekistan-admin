import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import RightAsideWrapper from "../../../../components/Aside/RightAsideWrapper";
import Switch from "../../../../components/Form/Switch";
import SwitchGroup from "../../../../components/SwitchGroup";
import { getPermissions } from "../../../../services/permissions";
import { getRoles } from "../../../../services/roles";

const RightAside = ({ useForm = {} }) => {
    const navigate = useNavigate()
    const {data: roles} = useQuery('roles', getRoles)
    const {data: permissions} = useQuery('permissions', getPermissions)
    const {getValues, setValue} = useForm
    const query = new URLSearchParams(window.location.search);

    const handleCheckboxChange = (e) => {
        const values = getValues()
        const permissions = values?.permissions || []
        if (e.target.checked) {
            setValue('permissions', [...permissions, e.target.value])
        } else {
            setValue('permissions', permissions?.filter(permission => permission !== e.target.value))
        }
    }

    const hanldeRadioChange = (e, role) => {
        if (e.target.checked) {
            query.set('role', role.id, {replace: true})
        } else {
            query.set('role', '', {replace: true})
        }
        navigate(`?${query.toString()}`, { replace: true })
    }

    useEffect(() => {
        setValue('role', query.get('role'))
    }, [window.location.search])

    return (
        <RightAsideWrapper>
            <SwitchGroup label="Пользовательские роля">
                {roles?.length > 0 && roles.map(role =>
                    <Switch
                        key={role.id}
                        label={role.title}
                        value={role.id}
                        checked={query.get('role') === role.id}
                        onChange={(e) => hanldeRadioChange(e, role)}
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
                        checked={query?.get('permissions')?.split(',')?.includes(permission?.id)}
                        onChange={handleCheckboxChange}
                    />
                )}
            </SwitchGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
