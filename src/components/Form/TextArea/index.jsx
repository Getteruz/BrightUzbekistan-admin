import cls from './TextArea.module.scss'

const TextArea = ({ label = '', placeholder }) => {
    return (
        <label className={cls.label}>
            {label}
            <textarea placeholder={placeholder}></textarea>
        </label>
    );
}

export default TextArea;
