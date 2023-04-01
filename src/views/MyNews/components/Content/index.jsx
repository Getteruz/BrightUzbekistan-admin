import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import RedButton from "../../../../components/Buttons/RedButton";
import SimpleButton from "../../../../components/Buttons/SimpleButton";
import ContentWrapper from "../../../../components/ContentWrapper";
import Flex from "../../../../components/Flex";
import BtnGroup from "../../../../components/Form/BtnGroup";
import Checkbox from "../../../../components/Form/Checkbox";
import { PlayIcon } from "../../../../components/icons";
import Loader from "../../../../components/Loader";
import NewsList from "../../../../components/NewsList";
import { getMyNews, publishNews } from "../../../../services/news";
import getQueryInArray from "../../../../utils/getQueryInArray";
import paramsToObject from "../../../../utils/paramsToObject";
import { btns } from "./data";
import cls from './Content.module.scss';
import NewsConfirm from "../../../../components/NewsConfirm";
import Filter from "../../../../components/Filter/Filter";
import { useGetWindowWidth } from "../../../../hooks/useGetWindowWith";

const Content = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const query = new useQueryClient()
    const windowWidth = useGetWindowWidth()
    const { data: mynews } = useQuery(
        ['my-news', params.get('category') || '', params.get('page') || ''],
        async ({ queryKey }) => await getMyNews({ categoryId: queryKey[1] || '', state: queryKey[2] || '' })
    )

    const publishCheckedNews = async () => {
        try {
            setLoading(true)
            setIsOpenModal(false)
            const newsIds = getQueryInArray('checked')
            const res = await publishNews({newsIds, tg: !!params.get('telegram'), inst: !!params.get('insta')})
            query.invalidateQueries(['my-news', params.get('category') || '', params.get('page') || ''])
            setSearchParams({...paramsToObject(params.entries()), checked: ''})
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const handleClick = () => {
        setIsOpenModal(true)
    }
 
    const handleCheck = (e) => {
        if (e.target.checked) {
            setSearchParams({ ...paramsToObject(params.entries()), checked: mynews?.map(news => news?.id)?.join(',') })
        } else {
            setSearchParams({ ...paramsToObject(params.entries()), checked: '' })
        }
    }

    useEffect(() => {
        setIsDisabled(!params.get('checked'))
        if (!params.get('page')) {
            setSearchParams({ ...paramsToObject(params.entries()), page: 'published' })
        }
    }, [location.search])

    return (
        <ContentWrapper navbar={
            <div className={cls.main}>
                <div className={cls.navbar__wrapper}>
                    <Flex gap='20' style={{ width: 'auto' }}>
                        <Checkbox
                            label={windowWidth > 525 ? `Выбрать все` : 'Все'}
                            onChange={handleCheck}
                            checked={mynews?.length > 0 && getQueryInArray('checked')?.length === mynews?.length}
                        />
                        <RedButton
                            disabled={isDisabled || !['general access', 'favorites']?.includes(params.get('page'))} 
                            onClick={handleClick}
                        >
                            Опубликовать
                        </RedButton>
                    </Flex>
                    <Flex gap='5' style={{ width: 'auto' }}>
                        <SimpleButton><PlayIcon /> Быстрый просмотр</SimpleButton>
                    </Flex>
                </div>
                <div>
                    <div className={cls.main__btnwrap}>
                        <BtnGroup>
                            {
                                btns?.length > 0 && btns.map(btn =>
                                    <button
                                        key={btn.id}
                                        className={params.get('page') === btn.link ? cls.active__btn : ''}
                                        onClick={() => setSearchParams({ page: btn.link }, { replace: true })}
                                    >
                                        {btn.label}
                                    </button>
                                )
                            }
                        </BtnGroup>
                    </div>
                </div>
            </div>
        }>
            <Filter />
            <NewsList news={mynews} />
            {loading && <Loader text="Идёт публикация новостей" />}
            {isOpenModal &&
                <NewsConfirm
                    onClickOutside={() => setIsOpenModal(false)}
                    onOk={publishCheckedNews}
                />}
        </ContentWrapper>
    );
}

export default Content;