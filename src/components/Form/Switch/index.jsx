import cls from './Switch.module.scss'

const Switch = ( {
    label = '', 
    type = 'checkbox', 
    value = '', 
    name = '', 
    register = {},  
    defaultChecked,
    checked,
    onClick = () => {},
    onChange = () => {},
    ...other
}) => {
    
    return (
        <label className={cls.checkbox} onClick={onClick}>
            <input type={type} name={name} value={value} checked={checked} defaultChecked={defaultChecked} {...register} onChange={onChange} {...other}/>
            <div className={cls.checkbox__check}>
                <div className={cls.checkbox__check__circle}></div>
            </div>
            {label}
        </label>
    );
}

export default Switch;
