import cls from './Switch.module.scss'

const Switch = ({label, type = 'checkbox', value = '', name = '', register}) => {
    return (
        <label className={cls.checkbox}>
            <input type={type} name={name} {...register} value={value}/>
            <div className={cls.checkbox__check}>
                <div className={cls.checkbox__check__circle}></div>
            </div>
            {label}
        </label>
    );
}

export default Switch;
