import cls from './GreyButton.module.scss'

const GreyButton = ({children}) => {
    return (
        <button className={cls.btn}>
            {children}
        </button>
    );
}

export default GreyButton;
