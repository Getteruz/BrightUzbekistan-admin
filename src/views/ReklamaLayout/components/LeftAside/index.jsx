import { useNavigate } from "react-router-dom";
import LeftAsideWrapper from "../../../../components/Aside/LeftAsideWrapper";
import SimpleButton from "../../../../components/Buttons/SimpleButton";
import WhiteButton from "../../../../components/Buttons/WhiteButton";
import Flex from "../../../../components/Flex";
import { PlusIcon } from "../../../../components/icons";


const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <LeftAsideWrapper>
            <WhiteButton onClick={() => navigate('/reklama/add?type=top')}>
                <PlusIcon />
                Добавить Рекламу
            </WhiteButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <SimpleButton>VIP</SimpleButton>
                <SimpleButton>Top</SimpleButton>
                <SimpleButton>Mid</SimpleButton>
                <SimpleButton>Aside</SimpleButton>
                <SimpleButton>Single</SimpleButton>
            </Flex>
            <span></span>
        </LeftAsideWrapper>
    );
}

export default LeftAside;