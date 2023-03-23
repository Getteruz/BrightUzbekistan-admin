import { useSearchParams } from 'react-router-dom';
import paramsToObject from '../../../utils/paramsToObject';
import Flex from '../../Flex';
import Switch from '../../Form/Switch';
import cls from './Instagram.module.scss'

const Instagram = ({label}) => {
    const [params, setSearchParams] = useSearchParams()

    const handleChange = (e) => {
        let urlParams = {...paramsToObject(params.entries())}
        if(e.target.checked) {
            urlParams = {...urlParams, insta: true}
        } else {
            urlParams = {...urlParams, insta: ''}
        }
        setSearchParams(urlParams)
    }

    return (
        <div className={cls.wrapper}>
            {label}
            <button className={cls.btn}>
                <Flex gap='5'>
                    <img src="/insta.svg" alt="instagram icon" />
                    <span>Instagram image</span>
                </Flex>
                <Switch onChange={handleChange} checked={!!params.get('insta')} />
            </button>
        </div>
    );
}

export default Instagram;
