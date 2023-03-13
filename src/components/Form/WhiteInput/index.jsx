import cls from './WhiteInput.module.scss'

const WhiteInput = ({
    placeholder, 
    type = 'text', 
    label, 
    register = {},
    ...other
}) => {
    return (
        <label className={cls.label} {...other}>
            <input type={type} className={cls.input} placeholder={placeholder} {...register} />
            <span className={cls.label__text}>{label}</span>
        </label>
    );
}

export default WhiteInput;
