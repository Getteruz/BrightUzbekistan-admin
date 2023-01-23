import { useState } from 'react';
import AllNews from './AllNews';
import SingleNews from './SingleNews';
import cls from './NewsDropdown.module.scss'

const pageCount = 2

const NewsDropdown = () => {
    const [page, setPage] = useState(1)

    return (
        <div className={cls.wrapper}>
            <div style={{translate: `calc((-100% / ${pageCount}) * (${page} - 1))`}}>
                <AllNews setPage={setPage}/>
                <SingleNews setPage={setPage}/>
            </div>
        </div>
    );
}

export default NewsDropdown;
