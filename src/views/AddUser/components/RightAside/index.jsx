import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RightAsideWrapper from "../../../../components/Aside/RightAsideWrapper";
import Switch from "../../../../components/Form/Switch";
import SwitchGroup from "../../../../components/SwitchGroup";
import { roles, permissions } from "./data";

const RightAside = ({ useForm = {} }) => {
    const navigate = useNavigate()
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
            query.set('role', role.value)
        } else {
            query.set('role', '')
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
                        label={role.label}
                        value={role.value}
                        checked={query.get('role') === role.value}
                        onChange={(e) => hanldeRadioChange(e, role)}
                    />
                )}
            </SwitchGroup>
            <SwitchGroup label="Пользовательские функции">
                {permissions?.length > 0 && permissions.map(permission =>
                    <Switch
                        key={permission.id}
                        label={permission.label}
                        value={permission.value}
                        name='permissions'
                        onChange={handleCheckboxChange}
                    />
                )}
            </SwitchGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
