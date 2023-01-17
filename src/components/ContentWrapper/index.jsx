import cls from './ContentWrapper.module.scss'

const ContentWrapper = ({children}) => {
    return (
        <div className={cls.wrapper}>
            {children}
        </div>
    );
}

export default ContentWrapper;
