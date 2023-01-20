import Flex from '../../../../components/Flex';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import Switch from '../../../../components/Form/Switch';
import Timepicker from '../../../../components/Form/Timepicker';
import cls from './RightAside.module.scss'

const RightAside = () => {
    return (
        <div className={cls.aside}>
            <span className={cls.aside__title}>Выберите категорию</span>
            <Flex direction='column' gap='12' className={cls.aside__checkboxlist}>
                <Switch label='Последние новости'/>
                <Switch label='Мир'/>
                <Switch label='Экономика' />
                <Switch label='Политика' />
                <Switch label='Общество'/>
                <Switch label='Бизнес' />
                <Switch label='Спорт' />
            </Flex>
            <div className={cls.aside__configList}>
                <p className={cls.aside__title}>Дата публикации</p>
                <div className={cls.aside__dataList}>
                    <Timepicker label='от' />
                    <Datapicker label='до' />
                </div>
            </div>
            <div className={cls.aside__configList}>
                <p className={cls.aside__title}>Теги</p>
                <RoundedInput placeholder='Название тега'/>
                <div className={cls.aside__tags}>
                    <span className={cls.aside__tag}># Узбекистан</span>
                    <span className={cls.aside__tag}># Таможня</span>
                    <span className={cls.aside__tag}># Шавкат Мирзиёев.</span>
                    <span className={cls.aside__tag}># Экономика</span>
                </div>
            </div>
        </div>
    );
}

export default RightAside;
