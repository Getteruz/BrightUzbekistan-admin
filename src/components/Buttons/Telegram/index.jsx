import { useSearchParams } from 'react-router-dom';
import paramsToObject from '../../../utils/paramsToObject';
import Flex from '../../Flex';
import Switch from '../../Form/Switch'
import cls from './Telegram.module.scss'

const Telegram = ({label}) => {
    const [params, setSearchParams] = useSearchParams()

    const handleChange = (e) => {
        let urlParams = {...paramsToObject(params.entries())}
        if(e.target.checked) {
            urlParams = {...urlParams, telegram: true}
        } else {
            urlParams = {...urlParams, telegram: ''}
        }
        setSearchParams(urlParams, {replace: true})
    }

    return (
        <div className={cls.wrapper}>
            {label}
            <button className={cls.btn}>
                <Flex gap='5'>
                    <img src="/telegram.svg" alt="telegram icon" />
                    <span>Telegram channel</span>
                </Flex>
                <Switch onChange={handleChange} checked={!!params.get('telegram')} />
            </button>
        </div>
    );
}

export default Telegram;