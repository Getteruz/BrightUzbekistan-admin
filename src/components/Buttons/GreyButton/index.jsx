import cls from './GreyButton.module.scss'

const GreyButton = ({children, ...other}) => {
    return (
        <button className={cls.btn} {...other}>
            {children}
        </button>
    );
}

export default GreyButton;
