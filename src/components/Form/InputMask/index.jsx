import ReactInputMask from "react-input-mask";
import { Controller } from "react-hook-form";
import cls from './InputMask.module.scss'

const InputMask = ({
    placeholder = '',
    mask = '',
    name = '',
    rules,
    control,
}) => {
    return (
        <Controller
            name={name}
            defaultValue=''
            control={control}
            rules={rules}
            render={({field}) => (
                <ReactInputMask
                    className={cls.input}
                    placeholder={placeholder}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    mask={mask}
                />
            )}
        />
    );
}

export default InputMask;
