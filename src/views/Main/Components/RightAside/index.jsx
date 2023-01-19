import Avatar from '../../../../components/Avatar';
import Flex from '../../../../components/Flex';
import Switch from '../../../../components/Form/Switch';
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
                    <Switch label='Неделе'  name='sort' />
                    <Switch label='Месяц'  name='sort' />
                    <Switch label='Год'  name='sort' />
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
