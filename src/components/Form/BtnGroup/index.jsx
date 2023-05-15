import cls from './BtnGroup.module.scss'

const BtnGroup = ({ children, label = '' }) => {
    return (
        <div className={cls.label}>
            {label && <span>{label}</span>}
            <div className={cls.group}>
                {children}
            </div>
        </div>
    );
}

export default BtnGroup;
