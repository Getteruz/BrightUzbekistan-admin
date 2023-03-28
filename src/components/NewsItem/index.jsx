import { Link, useSearchParams } from 'react-router-dom';
import paramsToObject from '../../utils/paramsToObject';
import parseTimestapm from '../../utils/parseTimestamp';
import Flex from '../Flex';
import Checkbox from '../Form/Checkbox';
import { DotsIcon } from '../icons';
import cls from './NewsItem.module.scss'

const NewsItem = ({
    id = '',
    link = '',
    title = '',
    creator = '',
    categories = [],
    date = Date.now(),
    lastUpdate,
    editing = false
}) => {
    const [params, setSearchParams] = useSearchParams()
    const { hours, minutes } = parseTimestapm(date)
    const { hours: updateHours, minutes: updateMinutes } = parseTimestapm(lastUpdate)

    const handleCheck = (e) => {
        let checkedNews = params.get('checked')?.split(',') || []
        if (e.target.checked) {
            checkedNews = [...checkedNews, id]
        } else {
            checkedNews = checkedNews?.filter(newsId => newsId !== id)
        }
        setSearchParams({ ...paramsToObject(params.entries()), 'checked': checkedNews?.join(',') })
    }

    return (
        <div className={cls.item}>
            <Checkbox
                label={`${hours}:${minutes}`}
                light={true}
                onChange={handleCheck}
                checked={(params.get('checked') || '')?.split(',')?.includes(id)}
                defaultChecked={(params.get('checked') || '')?.split(',').some(newsId => newsId === id)}
            />
            <Flex gap='10' direction='column'>
                <Link to={link}>
                    <div className={cls.item__text__wrapper}>
                        <h3 className={cls.item__title}>{title}</h3>
                        <span className={cls.item__author}>{creator}</span>
                    </div>
                </Link>
                <div className={cls.item__text}>
                    <span className={cls.item__category}>{categories?.join(', ')}</span>
                    {
                        editing ? 
                            <span className={cls.item__editing}>Редактируется...</span> :
                            lastUpdate && <span className={cls.item__category}>Последнее обновление {`${updateHours}:${updateMinutes}`}</span>
                    }
                </div>
            </Flex>
            <button className={cls.item__dots}>
                <DotsIcon />
            </button>
        </div>
    );
}

export default NewsItem;
