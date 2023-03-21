import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import RedButton from "../../../../components/Buttons/RedButton";
import SimpleButton from "../../../../components/Buttons/SimpleButton";
import ContentWrapper from "../../../../components/ContentWrapper";
import Flex from "../../../../components/Flex";
import Checkbox from "../../../../components/Form/Checkbox";
import { PlayIcon } from "../../../../components/icons";
import Loader from "../../../../components/Loader";
import NewsList from "../../../../components/NewsList";
import { getMyNews, publishNews } from "../../../../services/news";
import getQueryInArray from "../../../../utils/getQueryInArray";

const Content = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [params, setSearchParams] = useSearchParams()
    const {data: mynews} = useQuery(
        ['my-news', params.get('category') || ''], 
        async({queryKey}) => await getMyNews({categoryId: queryKey[1] || ''})
    )

    const handleClick = async () => {
        try {
            setLoading(true)
            const ids = getQueryInArray('checked')
            const res = await publishNews(ids)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const handleCheck = (e) => {
        if(e.target.checked) {
            setSearchParams({checked: mynews?.map(news => news?.id)?.join(',')})
        } else {
            setSearchParams({checked: ''})
        }
    }

    useEffect(() => {
       setIsDisabled(!params.get('checked'))
    }, [location.search])
    
    return (
        <ContentWrapper navbar={
            <div style={{ width: '100%', display: 'flex', gap: '20px', alignItems: 'center'}}>
                <Flex gap='20' style={{width: 'auto'}}>
                    <Checkbox 
                        label="Выбрать все" 
                        onChange={handleCheck} 
                        checked={getQueryInArray('checked')?.length === mynews?.length} 
                    />
                    <RedButton disabled={isDisabled} onClick={handleClick}>
                        Опубликовать
                    </RedButton>
                </Flex>
                <Flex gap='5' style={{width: 'auto'}}>
                    <SimpleButton><PlayIcon /> Быстрый просмотр</SimpleButton>
                </Flex>
            </div>
        }>
            <NewsList news={mynews}/>
            {loading && <Loader text="Идёт публикация новостей" />}
        </ContentWrapper>
    );
}

export default Content;
