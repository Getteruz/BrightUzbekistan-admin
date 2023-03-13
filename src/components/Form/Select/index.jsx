import { Select as CSelect } from "antd";
import { Controller } from "react-hook-form";
import { SelectIcon } from "../../icons";
import cls from './Select.module.scss'

const Select = ({
    label, 
    name = '',
    options = [], 
    placeholder = '',
    rules,
    control
}) => {
    return (
        <label className={cls.label}>
            {label}
            <Controller 
                name={name}
                control={control}
                defaultValue=''
                rules={rules}
                render={({field}) => (
                    <CSelect 
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        options={options}
                        suffixIcon={<SelectIcon />}
                        placeholder={placeholder}
                    />
                )}
            />
        </label>
    );
}

export default Select;
