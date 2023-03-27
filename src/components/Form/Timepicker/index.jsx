import { TimePicker } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import cls from './Timepicker.module.scss'

const Timepicker = ({
    label, 
    onChange,
}) => {

    return (
        <div className={cls.timepicker}>
            <span className={cls.timepicker__label}>{label}</span>
            <TimePicker 
                className={cls.custom}
                format='HH:mm' 
                onChange={onChange} 
            />
        </div>
    );
}

export default Timepicker;
