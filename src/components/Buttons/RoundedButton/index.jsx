import cls from './RoundedButton.module.scss'

const RoundedButton = ({children, className, ...other}) => {
    return (
        <button className={`${cls.btn} ${className}`} {...other}>{children}</button>
    );
}

export default RoundedButton;
