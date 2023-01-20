import cls from './Input.module.scss'

const Input = ({type = 'text', placeholder = '', label = ''}) => {
    return (
        <label className={cls.label}>
            {label}
            <input type={type} placeholder={placeholder} />
        </label>
    );
}

export default Input;
