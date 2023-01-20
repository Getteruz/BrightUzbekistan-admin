import { TimePicker } from "antd";
import cls from './Timepicker.module.scss'

const Timepicker = ({label}) => {
    return (
        <div className={cls.timepicker}>
            <span className={cls.timepicker__label}>{label}</span>
            <TimePicker className={cls.custom} format='HH:mm' />
        </div>
    );
}

export default Timepicker;
