import { Select as CSelect } from "antd";
import { SelectIcon } from "../../icons";
import cls from './Select.module.scss'

const Select = ({label, options = [], placeholder}) => {
    return (
        <label className={cls.label}>
            {label}
            <CSelect 
                options={options} 
                placeholder={placeholder} 
                suffixIcon={<SelectIcon />}
            />
        </label>
    );
}

export default Select;
