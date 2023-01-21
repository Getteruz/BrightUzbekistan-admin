import Flex from '../../../../Flex';
import { DownloadIcon } from '../../../../icons';
import cls from './Instagram.module.scss'

const Instagram = ({label}) => {
    return (
        <div className={cls.wrapper}>
            {label}
            <button className={cls.btn}>
                <Flex gap='5'>
                    <img src="/insta.svg" alt="instagram icon" />
                    <span>Instagram image</span>
                </Flex>
                <DownloadIcon />
            </button>
        </div>
    );
}

export default Instagram;
