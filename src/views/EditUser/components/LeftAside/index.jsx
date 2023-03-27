import LeftAsideWrapper from "../../../../components/Aside/LeftAsideWrapper";
import Flex from "../../../../components/Flex";
import RoundedButton from '../../../../components/Buttons/RoundedButton'
import { LeftIcon } from "../../../../components/icons";
import SimpleButton from "../../../../components/Buttons/SimpleButton";
import { useNavigate } from "react-router-dom";


const LeftAside = () => {
    const navigate = useNavigate()

    return (
        <LeftAsideWrapper>
            <Flex gap='28' direction='column' alignItems='flex-start'>
                <RoundedButton onClick={() => navigate(-1)}>
                    <LeftIcon />
                    Назад
                </RoundedButton>
                <Flex gap='11' direction='column' alignItems='flex-start'>
                    <SimpleButton light={true}>Что такое роль?</SimpleButton>
                    <SimpleButton light={true}>Что такое функции ?</SimpleButton>
                </Flex>
            </Flex>
            <span></span>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
