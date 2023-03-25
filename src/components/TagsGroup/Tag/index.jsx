import cls from './Tag.module.scss'

const Tag = ({ children, onClick = () => {} }) => {
    return (
        <span className={cls.tag} onClick={onClick}>
            {children}
        </span>
    )
}

export default Tag;
