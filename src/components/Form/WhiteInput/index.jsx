import { useState } from 'react';
import cls from './WhiteInput.module.scss'

const WhiteInput = ({
    placeholder, 
    type = 'text', 
    label, 
    register = {},
    ...other
}) => {
    const [viewPlaceholder, setViewPlaceholder] = useState(true)
    return (
        <label className={cls.label} {...other}>
            <span className={cls.label__text}>{label}</span>
            <input 
                type={type} 
                className={cls.input} 
                placeholder={viewPlaceholder ? placeholder : ''} 
                {...register} 
                onFocus={() => setViewPlaceholder(false)} 
                onBlur={() => setViewPlaceholder(true)}
            />
        </label>
    );
}

export default WhiteInput;