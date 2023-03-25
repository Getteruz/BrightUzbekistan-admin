import { useState } from 'react';
import cls from './RoundedInput.module.scss'

const RoundedInput = ({placeholder, type = 'text', label = '', ...other}) => {
    
    return (
        <label className={cls.label}>
            {label}
            <input type={type} placeholder={placeholder} className={cls.input} {...other}/>
        </label>
    );
}

export default RoundedInput;
