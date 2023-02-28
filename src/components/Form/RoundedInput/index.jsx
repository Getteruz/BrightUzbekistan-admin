import { useState } from 'react';
import cls from './RoundedInput.module.scss'

const RoundedInput = ({placeholder, type = 'text', label = '', setHashtags, ...other}) => {
    const [value, setValue] = useState()
    return (
        <label className={cls.label}>
            {label}
            <input type={type} placeholder={placeholder} className={cls.input}
                onKeyUp={(e) => {
                    if(e.keyCode === 13) {
                        setHashtags(state => [...state, e.target.value])
                        e.target.value = ''
                    }
                }}
                onChange={(e) => setValue(e.target.value)}
            />
        </label>
    );
}

export default RoundedInput;
