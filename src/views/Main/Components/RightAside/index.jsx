import Avatar from '../../../../components/Avatar';
import Flex from '../../../../components/Flex';
import Checkout from '../../../../components/Form/Checkout';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import cls from './RightAside.module.scss'

const RightAside = () => {
    return (
        <div className={cls.aside}>
            <span className={cls.aside__title}>По пользователю</span>
            <RoundedInput placeholder='username' />
            <Flex gap='7' rowCount={4} className={cls.aside__list}>
                <Avatar src='/avatar.png' />
                <Avatar src='/avatar.png' />
                <Avatar src='/avatar.png' />
                <Avatar src='/avatar.png' />
                <Avatar src='/avatar.png' />
            </Flex>
            <div className={cls.aside__configList}>
                <p className={cls.aside__title}>Сортировка</p>
                <Flex gap='20' direction='column'>
                    <Checkout label='Неделе' />
                    <Checkout label='Месяц' />
                    <Checkout label='Год' />
                </Flex>
            </div>
            <div className={cls.aside__configList}>
                <p className={cls.aside__title}>По дате</p>
                <div className={cls.aside__dataList}>
                    <Datapicker label='от' />
                    <Datapicker label='до' />
                </div>
            </div>
        </div>
    );
}

export default RightAside;
