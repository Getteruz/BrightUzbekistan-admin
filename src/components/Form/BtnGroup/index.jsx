import cls from './BtnGroup.module.scss'

const BtnGroup = ({children}) => {
    return (
        <div className={cls.group}>
            {children}  
        </div>
    );
}

export default BtnGroup;
