import cls from './Switch.module.scss'

const Switch = ({label, type = 'checkbox', name = ''}) => {
    return (
        <label className={cls.checkbox}>
            <input type={type} name={name} />
            <div className={cls.checkbox__check}>
                <div className={cls.checkbox__check__circle}></div>
            </div>
            {label}
        </label>
    );
}

export default Switch;
