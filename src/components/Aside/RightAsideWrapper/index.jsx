import cls from './RightAsideWrapper.module.scss'

const RightAsideWrapper = ({children}) => {
    return (
        <div className={cls.aside}>
            {children}
        </div>
    );
}

export default RightAsideWrapper;
