import cls from './GreyButton.module.scss'

const GreyButton = ({children, active, ...other}) => {
    return (
        <button className={`${cls.btn} ${active ? cls.active : ''}`} {...other}>
            {children}
        </button>
    );
}

export default GreyButton;
