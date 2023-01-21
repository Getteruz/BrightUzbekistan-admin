import cls from './LeftAsideWrapper.module.scss'

const LeftAsideWrapper = ({children}) => {
    return (
        <div className={cls.aside}>
            {children}
        </div>
    );
}

export default LeftAsideWrapper;
