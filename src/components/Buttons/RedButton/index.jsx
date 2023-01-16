import cls from './RedButton.module.scss'

const RedButton = ({children}) => {
    return (
        <button className={cls.btn}>
            {children}
        </button>
    );
}

export default RedButton;
