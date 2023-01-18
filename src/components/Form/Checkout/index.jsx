import cls from './Checkout.module.scss'

const Checkout = ({label, type = 'checkbox', name = ''}) => {
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

export default Checkout;
