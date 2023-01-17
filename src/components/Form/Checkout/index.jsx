import cls from './Checkout.module.scss'

const Checkout = ({label}) => {
    return (
        <label className={cls.checkbox}>
            <div className={cls.checkbox__check}>
                <div className={cls.checkbox__check__circle}></div>
            </div>
            <input type="checkbox" />
            {label}
        </label>
    );
}

export default Checkout;
