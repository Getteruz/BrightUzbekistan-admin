import Button from '../../Button';
import cls from './Circle.module.scss'

const Circle = ({label = ''}) => {
    return (
        <div className={cls.wrapper}>
            {label}
            <label className={cls.label}>
            <div className={cls.label__circle}>
                <Button />
                <p className={cls.label__title}>Загрузить фото</p>
                <p className={cls.label__name}>img03.jpg</p>
            </div>
        </label>
        </div>
    );
}

export default Circle;
