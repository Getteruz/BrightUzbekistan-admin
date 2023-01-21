import Flex from '../Flex';
import cls from './SwitchGroup.module.scss'

const SwitchGroup = ({label = '', switches, children}) => {
    return (
        <Flex direction='column' gap='15' algnItems='flex-start'>
            <span className={cls.label}>{label}</span>
            <Flex direction='column' alignItems='flex-start' gap='10'>
                {children}
            </Flex>
        </Flex>
    );
}

export default SwitchGroup;
