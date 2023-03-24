import { useState } from 'react';
import AllNews from './AllNews';
import SingleNews from './SingleNews';
import cls from './NewsDropdown.module.scss'

const pageCount = 2

const NewsDropdown = ({news = []}) => {
    const [page, setPage] = useState(news?.length > 1 ? 1 : 2)
console.log(news);
    return (
        <div className={cls.wrapper} >
            <div style={{translate: `calc((-100% / ${pageCount}) * (${page} - 1))`}}>
                <AllNews setPage={setPage} news={news}/>
                <SingleNews setPage={setPage} news={news} />
            </div>
        </div>
    );
}

export default NewsDropdown;