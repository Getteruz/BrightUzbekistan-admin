import { CheckIcon } from '../../icons';
import cls from './Checkbox.module.scss'

const Checkbox = ({
    label = '', 
    light = false, 
    onChange = () => {},
    defaultChecked,
    checked,
}) => {
    return (
        <label className={`${cls.label} ${light ? cls.light : ''}`}>
            <input type="checkbox" onChange={onChange} defaultChecked={defaultChecked} checked={checked} />
            <div className={cls.label__box}>
                <CheckIcon />
            </div>
            <span className={cls.label__text}>{label}</span>
        </label>
    );
}

export default Checkbox;
