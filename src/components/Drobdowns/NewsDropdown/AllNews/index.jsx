import Instagram from '../../../Buttons/Instagram';
import Telegram from '../../../Buttons/Telegram';
import OrangeBlurButton from '../../../Buttons/OrangeBlurButton';
import PrimaryButton from '../../../Buttons/PrimaryButton';
import Card from '../Card';
import cls from './AllNews.module.scss'

const AllNews = ({setPage}) => {
    return (
        <div className={cls.box}>
            <p className={cls.box__info}>Количество новостей для публикации: 4</p>
            <div className={cls.box__items}>
                <Card onClick={() => setPage(2)}/>
                <Card onClick={() => setPage(2)}/>
                <Card onClick={() => setPage(2)}/>
                <Card onClick={() => setPage(2)}/>
            </div>
            <div className={cls.box__btnwrapper}>
                <Telegram label='Telegram channel' />
                <Instagram label='Download .img Instagram' />
            </div>
            <div className={cls.box__btns}>
                <div>
                    <PrimaryButton>Подтвердить</PrimaryButton>
                    <OrangeBlurButton>Ha редактирование</OrangeBlurButton>
                </div>
                <ul className={cls.box__link__list}>
                    <li className={cls.box__link}>Как ?</li>
                    <li className={cls.box__link}>Как хранить архив?</li>
                    <li className={cls.box__link}>Ещё</li>
                </ul>
            </div>
        </div>
    );
}

export default AllNews;