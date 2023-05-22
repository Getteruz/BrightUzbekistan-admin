import { forwardRef } from "react";
import { useQuery } from "react-query";
import RedButton from "../../../../components/Buttons/RedButton";
import SimpleButton from "../../../../components/Buttons/SimpleButton";
import ContentWrapper from "../../../../components/ContentWrapper";
import Flex from "../../../../components/Flex";
import Checkbox from "../../../../components/Form/Checkbox";
import { PlayIcon } from "../../../../components/icons";
import NewsList from "../../../../components/NewsList";
import NewsSkeleton from "../../../../components/Skeletons/NewsSkeleton";
import { getNotifications } from "../../../../services/news";

const Content = forwardRef(({ }, ref) => {
    const { data: notifications, isLoading } = useQuery(['notifications'], getNotifications)

    return (
        <ContentWrapper navbar={
            <div style={{ width: '100%', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Flex gap='20' style={{ width: 'auto' }}>
                    <Checkbox label="Выбрать все" />
                    <RedButton>
                        Опубликовать
                    </RedButton>
                </Flex>
                <Flex gap='5' style={{ width: 'auto' }}>
                    <span ref={ref}><SimpleButton><PlayIcon /> Быстрый просмотр</SimpleButton></span>
                </Flex>
             </div>
        }>
            {
                isLoading ? (
                    <Flex direction='column' gap='20'>
                        {Array(5)?.fill(null).map((_, index) => (
                            <NewsSkeleton key={index} />
                        ))}
                    </Flex>
                ) : (
                    <NewsList news={notifications?.map(data => ({ ...data?.news, isViewed: data?.isViewed }))} />
                )
            }
        </ContentWrapper>
    );
})

export default Content;