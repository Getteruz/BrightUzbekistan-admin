import Flex from '../Flex';
import ListItem from '../NewsItem';

const NewsList = ({news = []}) => {
    return (
        <Flex direction='column' gap='20'>
            {
                news?.length > 0 && news.map((_, index) => <ListItem key={index} />)
            }
        </Flex>
    );
}

export default NewsList;
