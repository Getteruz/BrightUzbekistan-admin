import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import NewsItem from '../../../../components/NewsItem';
import GreyButton from '../../../../components/Buttons/GreyButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Flex from '../../../../components/Flex';
import Checkbox from '../../../../components/Form/Checkbox';
import { ArchiveIcon, DeleteIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loaders/Loader';
import { deleteNews, getGeneralAccessNews, publishNews } from '../../../../services/news';
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './Content.module.scss'
import RedButton from '../../../../components/Buttons/RedButton';
import NewsConfirm from '../../../../components/NewsConfirm';
import useSocket from '../../../../hooks/useSocket';
import NewsSkeleton from '../../../../components/Skeletons/NewsSkeleton';

const Content = () => {
    const socket = useSocket()
    const queryClient = useQueryClient()
    const [params, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { data: news, isLoading: newsLoading } = useQuery(
        ['news', 'general-access', params.get('category') || '',],
        async ({ queryKey }) => await getGeneralAccessNews({ categoryId: queryKey[2] || '' })
    )

    const publishCheckedNews = async () => {
        try {
            setIsLoading(true)
            setIsOpenModal(false)
            const newsIds = getQueryInArray('checked')
            const res = await publishNews({ newsIds, tg: !!params.get('telegram'), inst: !!params.get('insta') })
            queryClient.invalidateQueries(['news', 'general-access', params.get('category') || '',])
            setSearchParams({ ...paramsToObject(params.entries()), checked: '' })
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleClick = () => {
        setIsOpenModal(true)
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            setSearchParams({ ...paramsToObject(params.entries()), checked: news?.map(news => news?.id)?.join(',') })
        } else {
            setSearchParams({ ...paramsToObject(params.entries()), checked: '' })
        }
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteNews({ ids: getQueryInArray('checked') })
            queryClient.invalidateQueries(['news', 'general-access', params.get('category') || '',])
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        socket.on('news_editing', newsId => queryClient.setQueryData(
            ['news', 'general-access', params.get('category') || ''],
            (old) => old?.map(news => news?.id === newsId ? { ...news, isEditing: true } : news)
        ))
        socket.on('news_end_editing', newsId => queryClient.setQueryData(
            ['news', 'general-access', params.get('category') || ''],
            (old) => old?.map(news => news?.id === newsId ? { ...news, isEditing: false } : news)
        ))
    }, [])

    return (
        <ContentWrapper navbar={
            <div className={cls.content__menu} id='content-menu'>
                <Checkbox
                    label='Выбрать все'
                    onChange={handleCheck}
                    checked={news?.length > 0 && getQueryInArray('checked')?.length === news?.length}
                />
                <Flex gap='5'>
                    <RedButton
                        disabled={!params?.get('checked')?.length > 0}
                        onClick={handleClick}
                    >
                        Опубликовать
                    </RedButton>
                    <GreyButton active={!!params?.get('checked')} onClick={handleDelete}>
                        <DeleteIcon />
                        Удалить
                    </GreyButton>
                    <GreyButton active={!!params?.get('checked')}>
                        <ArchiveIcon />
                        В архив
                    </GreyButton>
                </Flex>
            </div>
        }>
            {isLoading && <Loader />}
            {isOpenModal &&
                <NewsConfirm
                    onClickOutside={() => setIsOpenModal(false)}
                    onOk={publishCheckedNews}
                />}
            {newsLoading ? (
                <Flex direction='column' gap='20'>
                    {Array(10)?.fill(null).map(() => (
                        <NewsSkeleton />
                    ))}
                </Flex>
            ) : (
                <Flex direction='column' gap='20'>
                    {
                        news?.length > 0 && news.map((news) =>
                            <NewsItem
                                id={news?.id}
                                link={`/general-access/edit/${news?.id}`}
                                key={news?.id}
                                title={news?.ru?.title}
                                creator={news?.creator?.fullName}
                                date={news?.created_at}
                                categories={news?.categories?.map(ctg => ctg?.ru)}
                                editing={news?.isEditing}
                                lastUpdate={news?.updated_at}
                            />)
                    }
                </Flex>
            )}
        </ContentWrapper>
    );
}

export default Content;
