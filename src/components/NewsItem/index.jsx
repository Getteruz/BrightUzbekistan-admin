import parseTimestapm from '../../utils/parseTimestamp';
import Flex from '../Flex';
import Checkbox from '../Form/Checkbox';
import { DotsIcon } from '../icons';
import cls from './NewsItem.module.scss'

const NewsItem = ({
    title = '',
    creator = '',
    categories = [],
    date = Date.now()
}) => {
    const { hours, minutes } = parseTimestapm(date)
    return (
        <div className={cls.item}>
            <Checkbox label={`${hours}:${minutes}`} light={true} />
            <Flex gap='10' direction='column'>
                <div className={cls.item__text__wrapper}>
                    <h3 className={cls.item__title}>{title}</h3>
                    <span className={cls.item__author}>{creator}</span>
                </div>
                <span className={cls.item__category}>{categories?.join(', ')}</span>
            </Flex>
            <button className={cls.item__dots}>
                <DotsIcon />
            </button>
        </div>
    );
}

export default NewsItem;
