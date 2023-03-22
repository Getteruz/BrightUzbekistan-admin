import Flex from "../Flex";
import cls from './DateGroup.module.scss'

const DateGroup = ({ label = '', children }) => {
    return (
        <Flex direction='column' gap='10'>
            <span className={cls.label}>{label}</span>
            <Flex direction='row' rowCount='2' gap='5'>
                {children}
            </Flex>
        </Flex>
    );
}

export default DateGroup;
