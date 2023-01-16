import cls from './RedButton.module.scss'

const WhiteButton = ({children, className}) => {
    return (
        <button className={`${cls.btn} ${className ? className : ''}`}>
            {children}
        </button>
    );
}

export default WhiteButton;
