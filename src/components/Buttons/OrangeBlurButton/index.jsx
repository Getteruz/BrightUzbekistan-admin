import cls from './OrangeBlurButton.module.scss'

const OrangeBlurButton = ({children, ...other}) => {
    return (
        <button className={cls.btn} {...other}>
            {children}
        </button>
    );
}

export default OrangeBlurButton;
