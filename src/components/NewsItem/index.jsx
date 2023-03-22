import { Link, useSearchParams } from 'react-router-dom';
import parseTimestapm from '../../utils/parseTimestamp';
import Flex from '../Flex';
import Checkbox from '../Form/Checkbox';
import { DotsIcon } from '../icons';
import cls from './NewsItem.module.scss'

const NewsItem = ({
    id = '',
    title = '',
    creator = '',
    categories = [],
    date = Date.now()
}) => {
    const [params, setSearchParams] = useSearchParams()
    const { hours, minutes } = parseTimestapm(date)

    const handleCheck = (e) => {
        let checkedNews = params.get('checked')?.split(',') || []
        if(e.target.checked){
            checkedNews = [...checkedNews, id]
        } else {
            checkedNews = checkedNews?.filter(newsId => newsId !== id)
        }
        setSearchParams({'checked': checkedNews?.join(',')})
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
                <div className={cls.item__text__wrapper}>
                    <Link to={`/news/edit/${id}`}><h3 className={cls.item__title}>{title}</h3></Link>
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
