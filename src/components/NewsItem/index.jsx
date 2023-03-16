import Flex from '../Flex';
import Checkbox from '../Form/Checkbox';
import { DotsIcon } from '../icons';
import cls from './NewsItem.module.scss'

const NewsItem = ({
    title = ''
}) => {
    return (
        <div className={cls.item}>
            <Checkbox label='9:41' light={true} />
            <Flex gap='10' direction='column'>
                <div className={cls.item__text__wrapper}>
                    <h3 className={cls.item__title}>{title}</h3>
                    <span className={cls.item__author}>Аббос Жанизаков</span>
                </div>
                <span className={cls.item__category}>Экономика</span>
            </Flex>
            <button className={cls.item__dots}>
                <DotsIcon />
            </button>
        </div>
    );
}

export default NewsItem;
