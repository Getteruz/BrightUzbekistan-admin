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
    control,
    value = ''
}) => {
    return (
        <label className={cls.label}>
            {label}
            <Controller 
                name={name}
                control={control}
                rules={rules}
                render={({field}) => (
                    <CSelect 
                        onChange={field.onChange}
                        {...{[value && 'value']: value}}
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
