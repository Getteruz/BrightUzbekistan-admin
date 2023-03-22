import { useNavigate } from "react-router-dom";
import RightAsideWrapper from "../../../../components/Aside/RightAsideWrapper";
import DateGroup from "../../../../components/DateGroup";
import Datapicker from "../../../../components/Form/Datapicker";
import Switch from "../../../../components/Form/Switch";
import SwitchGroup from "../../../../components/SwitchGroup";

const RightAside = () => {
    const navigate = useNavigate()
    const query = new URLSearchParams(window.location.search);

    const hanldeRadioChange = (e) => {
        if (e.target.checked) {
            query.set('sort', e.target.value)
        } else {
            query.set('sort', '')
        }
        navigate(`?${query.toString()}`, { replace: true })
    }
    return (
        <RightAsideWrapper>
            <DateGroup label="По дате">
                <Datapicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
            <SwitchGroup label="Сортировка">
            <Switch
                    label='Неделе'
                    value='Неделе'
                    checked={query.get('sort') === 'Неделе'}
                    onChange={(e) => hanldeRadioChange(e, 'Неделе')}
                />
                <Switch
                    label='Месяц'
                    value='Месяц'
                    checked={query.get('sort') === 'Месяц'}
                    onChange={(e) => hanldeRadioChange(e)}
                />
                <Switch
                    label='Год'
                    value='Год'
                    checked={query.get('sort') === 'Год'}
                    onChange={(e) => hanldeRadioChange(e)}
                />
            </SwitchGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
