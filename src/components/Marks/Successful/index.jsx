import cls from './Successful.module.scss'

const Successful = () => {
    return (
        <div className={cls.wrapper}>
            <svg className={cls.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                <circle className={cls.checkmark__circle} cx="26" cy="26" r="25" fill="none" /> 
                <path className={cls.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        </div>
    );
}

export default Successful;
