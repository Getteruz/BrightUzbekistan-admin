import styled from "@emotion/styled";
import Tag from "./Tag";

const List = styled('div')`
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
`
const TagsGroup = ({tags = [], setHashtags}) => {
    return (
        <List>
            {tags?.length > 0 && tags.map((tag, index) => 
                <Tag 
                    key={index} 
                    onClick={() => setHashtags(state => state.filter((_, stateIndex) => stateIndex !== index))}
                >
                    #{tag}
                </Tag>
            )}
        </List>
    );
}

export default TagsGroup;
