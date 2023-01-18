import { CheckIcon } from '../../icons';
import cls from './Checkbox.module.scss'

const Checkbox = ({label = ''}) => {
    return (
        <label className={cls.label}>
            <input type="checkbox" />
            <div className={cls.label__box}>
                <CheckIcon />
            </div>
            <span className={cls.label__text}>{label}</span>
        </label>
    );
}

export default Checkbox;
