import { useNavigate, useSearchParams } from 'react-router-dom';
import WhiteButton from '../../../../components/Buttons/WhiteButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton'
import Flex from '../../../../components/Flex';
import { PlusIcon } from '../../../../components/icons';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';
import { useQuery } from 'react-query';
import { getCategories } from '../../../../services/category';

const LeftAside = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const {data: categories} = useQuery('categories', getCategories)

    return (
        <LeftAsideWrapper>
            <WhiteButton onClick={() => navigate('/addnews')}>
                <PlusIcon />
                Добавить новости
            </WhiteButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                {
                    categories?.length > 0 && categories?.map(ctg => 
                        <SimpleButton 
                            key={ctg.id} 
                            active={params.get('category') === ctg.id}
                            onClick={() => navigate(`?category=${ctg?.id}`, {replace: true})}
                        >
                            {ctg?.ru}
                        </SimpleButton>
                    )
                }
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
                <SimpleButton>Создать категорию!</SimpleButton>
                <SimpleButton light={true}>Помощь!</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
