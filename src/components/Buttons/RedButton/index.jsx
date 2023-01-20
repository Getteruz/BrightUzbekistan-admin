import cls from './RedButton.module.scss'

const RedButton = ({children, ...other}) => {
    return (
        <button className={cls.btn} {...other}>
            {children}
        </button>
    );
}

export default RedButton;
