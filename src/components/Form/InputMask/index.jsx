import ReactInputMask from "react-input-mask";
import cls from './InputMask.module.scss'

const InputMask = ({placeholder = '', mask = ''}) => {
    return (
        <ReactInputMask 
            className={cls.input} 
            placeholder={placeholder}
            mask={mask}
        />
    );
}

export default InputMask;
