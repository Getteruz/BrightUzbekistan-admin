import Checkbox from '../Form/Checkbox';
import { DotsIcon } from '../icons';
import parseTimestamp from '../../utils/parseTimestamp'
import cls from './AdsItem.module.scss'
import { Link } from 'react-router-dom';

const AdsItem = ({
    isActive = false,
    title = '',
    createdAt = Date.now(),
    views = 0,
    uniqueViews = 0,
    clicks = 0,
    creator = '',
    link = '',
    onCheckboxChange = () => { },
    checked = false,
    type = ''
}) => {
    const { hours, minutes, data, monthInNumber, year } = parseTimestamp(createdAt)
    return (
        <div className={cls.item}>
            <div className={cls.item__check}>
                <Checkbox
                    light
                    onChange={onCheckboxChange}
                    checked={checked}
                />
                <span>
                    {hours}:{minutes} | {data},{monthInNumber},{year}
                </span>
            </div>
            <div className={cls.item__info}>
                <Link to={link}>
                    <span className={cls.item__info__title}>{title}</span>
                </Link>
                <ul className={cls.item__info__list}>
                    <li>
                        <span>Просмотры:</span>
                        {views}
                    </li>
                    <li>
                        <span>У.П:</span>
                        {uniqueViews}
                    </li>
                    <li>
                        <span>Клики:</span>
                        {clicks}
                    </li>
                    <li>
                        <span>Тип:</span>
                        {type}
                    </li>
                </ul>
            </div>
            <span className={cls.item__status} style={{ color: isActive ? '#07AC8E' : '#B56011' }}>
                {isActive ? 'Активный' : 'Деактивированный'}
            </span>
            <div className={cls.item__creator}>{creator}</div>
            <button className={cls.item__dots}>
                <DotsIcon />
            </button>
        </div>
    );
}

export default AdsItem;
