import cls from './Input.module.scss'

const Input = ({
    name = '',
    type = 'text', 
    placeholder = '', 
    label = '', 
    register = {}, 
    value = '',
    ...other
}) => {
    return (
        <label className={cls.label}>
            {label}
            <input type={type} placeholder={placeholder} value={value} {...register} {...other} />
        </label>
    );
}

export default Input;
