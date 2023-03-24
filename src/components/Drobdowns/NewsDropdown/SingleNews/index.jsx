import { useState } from 'react';
import OrangeBlurButton from '../../../Buttons/OrangeBlurButton';
import PrimaryButton from '../../../Buttons/PrimaryButton';
import WhiteButton from '../../../Buttons/WhiteButton'
import { LeftIcon, RightIcon } from '../../../icons';
import SingleCard from '../SingleCard';
import cls from './SingleNews.module.scss'



const SingleNews = ({setPage, news = []}) => {
    const [currentNews, setCurrentNews] = useState(1)
    const pagesCount = news?.length

    return (
        <div className={cls.box}>
            <div className={cls.box__nav}>
                <span>Превю</span>
                <div>
                    <WhiteButton
                        className={`${currentNews > 1 ? cls.active : ''}`}
                        onClick={() => setCurrentNews(prev => Math.max(prev - 1, 1))}
                    >
                        <LeftIcon />
                    </WhiteButton>
                    <span>{currentNews}</span>
                    <WhiteButton
                        className={`${currentNews < pagesCount ? cls.active : ''}`}
                        onClick={() => setCurrentNews(prev => Math.min(prev + 1, pagesCount))}
                    >
                        <RightIcon />
                    </WhiteButton>
                </div>
            </div>

            <div className={cls.box__cardswrapper}>
                <div style={{width: '100%', display: 'flex', translate: `calc((-100% / ${pagesCount}) * (${currentNews - 1}))`}}>
                    <SingleCard />
                </div>
            </div>

            <div className={cls.box__btns}>
                <div>
                    <div>
                        <PrimaryButton>Подтвердить</PrimaryButton>
                        <OrangeBlurButton onClick={() => setPage(1)}>Обратно</OrangeBlurButton>
                    </div>
                    <WhiteButton>Изменить</WhiteButton>
                </div>
                <ul className={cls.box__link__list}>
                    <li className={cls.box__link}>Узбекистан</li>
                    <li className={cls.box__link}>Как хранить архив?</li>
                    <li className={cls.box__link}>Ещё</li>
                </ul>
            </div>
        </div>
    );
}

export default SingleNews;
