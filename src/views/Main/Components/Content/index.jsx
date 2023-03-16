import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import GreyButton from '../../../../components/Buttons/GreyButton';
import ContentWrapper from '../../../../components/ContentWrapper';
import Flex from '../../../../components/Flex';
import Checkbox from '../../../../components/Form/Checkbox';
import { ArchiveIcon, DeleteIcon } from '../../../../components/icons';
import NewsList from '../../../../components/NewsList';
import { getNews, getNewsByCategory } from '../../../../services/news';
import cls from './Content.module.scss'

const Content = () => {
    const [params, setSearchParams] = useSearchParams()
    const {data: news} = useQuery(
        ['news', params.get('category') || ''], 
        async({queryKey}) => queryKey[1] ? await getNewsByCategory(queryKey[1]) : await getNews()
    )

    const handleCheck = (e) => {
        if(e.target.checked) {
            setSearchParams({checked: news?.map(news => news?.id)?.join(',')})
        } else {
            setSearchParams({checked: ''})
        }
    }
   
    return (
        <ContentWrapper navbar={
            <div className={cls.content__menu} id='content-menu'>
                <Checkbox label='Выбрать все' onChange={handleCheck} />
                <Flex gap='5'>
                    <GreyButton>
                        <DeleteIcon />
                        Удалить
                    </GreyButton>
                    <GreyButton>
                        <ArchiveIcon />
                        В архив
                    </GreyButton>
                </Flex>
            </div>
        }>
            <NewsList news={news} />
        </ContentWrapper>
    );
}

export default Content;
