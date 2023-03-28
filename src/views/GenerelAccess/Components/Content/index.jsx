import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import NewsItem from '../../../../components/NewsItem';
import GreyButton from '../../../../components/Buttons/GreyButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Flex from '../../../../components/Flex';
import Checkbox from '../../../../components/Form/Checkbox';
import { ArchiveIcon, DeleteIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loader';
import { deleteNews, getGeneralAccessNews } from '../../../../services/news';
import getQueryInArray from '../../../../utils/getQueryInArray';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './Content.module.scss'

const Content = () => {
    const queryClient = useQueryClient()
    const [params, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const { data: news } = useQuery(
        ['news', 'general-access', params.get('category') || '',],
        async ({ queryKey }) => await getGeneralAccessNews({ categoryId: queryKey[2] || '' })
    )

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

    return (
        <ContentWrapper navbar={<></>
            // <div className={cls.content__menu} id='content-menu'>
            //     <Checkbox
            //         label='Выбрать все'
            //         onChange={handleCheck}
            //         checked={news?.length > 0 && getQueryInArray('checked')?.length === news?.length}
            //     />
            //     <Flex gap='5'>
            //         <GreyButton active={!!params?.get('checked')} onClick={handleDelete}>
            //             <DeleteIcon />
            //             Удалить
            //         </GreyButton>
            //         <GreyButton active={!!params?.get('checked')}>
            //             <ArchiveIcon />
            //             В архив
            //         </GreyButton>
            //     </Flex>
            // </div>
        }>
            {isLoading && <Loader text='Выполняется удаление новостей' />}
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
                            // lastUpdate={news?.updated_at}
                        />)
                }
            </Flex>
        </ContentWrapper>
    );
}

export default Content;