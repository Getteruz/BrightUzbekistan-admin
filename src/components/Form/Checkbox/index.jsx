import { CheckIcon } from '../../icons';
import cls from './Checkbox.module.scss'

const Checkbox = ({label = '', light = false}) => {
    return (
        <label className={`${cls.label} ${light ? cls.light : ''}`}>
            <input type="checkbox" />
            <div className={cls.label__box}>
                <CheckIcon />
            </div>
            <span className={cls.label__text}>{label}</span>
        </label>
    );
}

export default Checkbox;
