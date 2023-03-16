import Flex from '../Flex';
import ListItem from '../NewsItem';

const NewsList = ({news = []}) => {
    return (
        <Flex direction='column' gap='20'>
            {
                news?.length > 0 && news.map((news, index) => 
                    <ListItem 
                        key={news?.id} 
                        title={news?.ru?.title}
                    />)
            }
        </Flex>
    );
}

export default NewsList;
