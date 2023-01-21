import Flex from '../../../../Flex';
import Switch from '../../../../Form/Switch'
import cls from './Telegram.module.scss'

const Telegram = ({label}) => {
    return (
        <div className={cls.wrapper}>
            {label}
            <button className={cls.btn}>
                <Flex gap='5'>
                    <img src="/telegram.svg" alt="telegram icon" />
                    <span>Telegram channel</span>
                </Flex>
                <Switch />
            </button>
        </div>
    );
}

export default Telegram;