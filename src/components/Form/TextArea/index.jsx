import cls from './TextArea.module.scss'

const TextArea = ({ label = '', placeholder, register, ...other }) => {
    return (
        <label className={cls.label}>
            {label}
            <textarea placeholder={placeholder} {...register} {...other}></textarea>
        </label>
    );
}

export default TextArea;
