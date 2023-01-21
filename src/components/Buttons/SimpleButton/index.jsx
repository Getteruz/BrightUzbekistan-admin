import cls from './SimpleButton.module.scss'

const SimpleButton = ({children, light = false, ...other}) => {
    return (
        <button className={`${cls.btn} ${light ? cls.light : ''}`} {...other}>{children}</button>
    );
}

export default SimpleButton;
