import Flex from '../Flex';
import ListItem from '../NewsItem';

const NewsList = ({ news = [] }) => {
    return (
        <Flex direction='column' gap='20'>
            {
                news?.length > 0 && news.map((news) =>
                    <ListItem
                        id={news?.id}
                        key={news?.id}
                        title={news?.ru?.title}
                        creator={news?.creator?.fullName}
                        date={news?.created_at}
                        categories={news?.categories?.map(ctg => ctg?.ru)}
                    />)
            }

        </Flex>
    );
}

export default NewsList;
