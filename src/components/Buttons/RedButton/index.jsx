import cls from './RedButton.module.scss'

const RedButton = ({children, className, disabled = false, type = 'button', ...other}) => {
    return (
        <button className={cls.btn + ' ' + className} disabled={disabled} type={type} {...other}>
            {children}
        </button>
    );
}

export default RedButton;
