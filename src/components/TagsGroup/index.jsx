import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import Tag from "./Tag";

const List = styled('div')`
    display: flex;
    flex-wrap: wrap;
`
const TagsGroup = ({tags = [], setValue = () => {}}) => {
    const [params] = useSearchParams()
    return (
        <List>
            {tags?.length > 0 && tags.map((tag, index) => 
                <Tag 
                    key={index} 
                    onClick={() => setValue(`${params.get('lang')}.hashtags`, tags.filter((_, stateIndex) => stateIndex !== index))}
                >
                    #{tag}
                </Tag>
            )}
        </List>
    );
}

export default TagsGroup;
