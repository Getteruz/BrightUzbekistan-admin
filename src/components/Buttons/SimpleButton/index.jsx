import cls from './SimpleButton.module.scss'

const SimpleButton = ({
    children, 
    light = false, 
    active = false,
    ...other
}) => {
    return (
        <button className={`${cls.btn} ${light ? cls.light : ''} ${active ? cls.active : ''}`} {...other}>{children}</button>
    );
}

export default SimpleButton;
