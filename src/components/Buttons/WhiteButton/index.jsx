import cls from './RedButton.module.scss'

const WhiteButton = ({children, className, ...other}) => {
    return (
        <button className={`${cls.btn} ${className ? className : ''}`} {...other}>
            {children}
        </button>
    );
}

export default WhiteButton;
