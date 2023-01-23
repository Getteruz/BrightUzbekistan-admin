import cls from './PrimaryButton.module.scss'

const PrimaryButton = ({children, ...other}) => {
    return (
        <button className={cls.btn} {...other}>
            {children}
        </button>
    );
}

export default PrimaryButton;
