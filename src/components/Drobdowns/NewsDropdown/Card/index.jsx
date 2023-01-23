import { ClockIcon } from '../../../icons';
import cls from './Card.module.scss'

const Card = ({onClick }) => {
    return (
        <div className={cls.card} onClick={onClick}>
            <p className={cls.card__title}>Рискнувшая отдыхом в бюджетном отеле Египта россиянка рассказала о везении</p>
            <div className={cls.card__info}>
                <span className={cls.card__time}><ClockIcon /> 09:41</span>
                <span className={cls.card__ctg}>Политика</span>
            </div>
        </div>
    );
}

export default Card;
