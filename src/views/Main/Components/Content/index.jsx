import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import GreyButton from '../../../../components/Buttons/GreyButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Filter from '../../../../components/Filter/Filter';
import Flex from '../../../../components/Flex';
import Checkbox from '../../../../components/Form/Checkbox';
import { ArchiveIcon, DeleteIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loaders/Loader';
import NewsList from '../../../../components/NewsList';
import { deleteNews, getPublishedNews } from '../../../../services/news';
import SiteAdd from '../../../../components/siteAdd/SiteAdd';
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith';
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './Content.module.scss'
import NewsSkeleton from '../../../../components/Skeletons/NewsSkeleton';
import { useInView } from 'react-intersection-observer';

const Content = () => {
    const { ref, inView } = useInView()
    const queryClient = useQueryClient()
    const windowWidth = useGetWindowWidth()
    const [isLoading, setIsLoading] = useState(false)
    const [params, setSearchParams] = useSearchParams()
    const { data, isLoading: newsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['news', params.get('category') || '', params.get('user') || ''],
        async ({ pageParam = 1, queryKey }) => await getPublishedNews({ categoryId: queryKey[1], creatorId: queryKey[2], page: pageParam, limit: 12 }) || {},
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage?.totalCount > pages?.length * 12 ? pages.length + 1 : undefined
            }
        }
    )
    const news = data?.pages?.reduce((acc, page) => [...acc, ...page.items], []) || []

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
            queryClient.invalidateQueries(['news', params.get('category') || ''])
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])

    return (
        <ContentWrapper navbar={
            <div className={cls.content__menu} id='content-menu'>
                <Checkbox
                    label={windowWidth > 525 ? `Выбрать все` : 'Все'}
                    onChange={handleCheck}
                    checked={news?.length > 0 && getQueryInArray('checked')?.length === news?.length}
                />

                <Flex gap='5'>
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
            {isLoading && <Loader text='Выполняется удаление новостей' />}
            <Filter />
            {newsLoading ? (
                <Flex direction='column' gap='20'>
                    {Array(10)?.fill(null).map((_, index) => (
                        <NewsSkeleton key={index} />
                    ))}
                </Flex>
            ) : (
                <>
                    <NewsList news={news} />
                    {isFetchingNextPage && (
                        <Flex direction='column' gap='20'>
                            {Array(10)?.fill(null).map((_, index) => (
                                <NewsSkeleton key={index} />
                            ))}
                        </Flex>
                    )}
                </>
            )}
            <div ref={ref} style={{ padding: '10px' }}></div>
            <SiteAdd />
        </ContentWrapper>
    );
}

export default Content;
