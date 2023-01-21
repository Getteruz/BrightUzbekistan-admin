import RightAsideWrapper from "../../../../components/Aside/RightAsideWrapper";
import DateGroup from "../../../../components/DateGroup";
import Datapicker from "../../../../components/Form/Datapicker";
import Switch from "../../../../components/Form/Switch";
import SwitchGroup from "../../../../components/SwitchGroup";

const RightAside = () => {
    return (
        <RightAsideWrapper>
            <DateGroup label="По дате">
                <Datapicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
            <SwitchGroup label="Сортировка">
                <Switch label='Неделе' name='sort' />
                <Switch label='Месяц' name='sort' />
                <Switch label='Год' name='sort' />
            </SwitchGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
