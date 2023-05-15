import cls from './GreyButton.module.scss'

const GreyButton = ({children, active, fill = false,  ...other}) => {
    return (
        <button className={`${cls.btn} ${active ? cls.active : ''} ${fill ? cls.fill : ''}`} {...other}>
            {children}
        </button>
    );
}

export default GreyButton;
