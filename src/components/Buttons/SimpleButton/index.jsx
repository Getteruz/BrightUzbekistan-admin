import cls from './SimpleButton.module.scss'

const SimpleButton = ({children, ...other}) => {
    return (
        <button className={cls.btn} {...other}>{children}</button>
    );
}

export default SimpleButton;
