import cls from './RoundedInput.module.scss'

const RoundedInput = ({placeholder, type = 'text', ...other}) => {
    return (
        <input type={type} placeholder={placeholder} className={cls.input} {...other} />
    );
}

export default RoundedInput;
