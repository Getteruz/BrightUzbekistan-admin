import cls from './Input.module.scss'

const Input = ({
    name = '',
    type = 'text', 
    placeholder = '', 
    label = '', 
    register = {}, 
    ...other
}) => {
    return (
        <label className={cls.label}>
            {label}
            <input type={type} placeholder={placeholder} {...register} {...other} />
        </label>
    );
}

export default Input;
