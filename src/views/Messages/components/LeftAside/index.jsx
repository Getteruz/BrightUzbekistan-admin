import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Flex from "../../../../components/Flex";
import LeftAsideWrapper from "../../../../components/Aside/LeftAsideWrapper";
import SimpleButton from "../../../../components/Buttons/SimpleButton";
import { getCategories } from '../../../../services/category';

const LeftAside = () => {
    const { data: categories } = useQuery('categories', getCategories, { cacheTime: Infinity, staleTime: Infinity })
    const navigate = useNavigate();
    const [params] = useSearchParams();

    return (
        <LeftAsideWrapper>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                {
                    categories?.length > 0 && categories?.map(ctg =>
                        <SimpleButton
                            key={ctg.id}
                            active={params.get('category') === ctg.id}
                            onClick={() => navigate(`?category=${ctg?.id}`, { replace: true })}
                        >
                            {ctg?.ru}
                        </SimpleButton>
                    )
                }
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
