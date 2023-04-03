import { Skeleton } from 'antd';
import cls from './NewsSkeleton.module.scss'

const NewsSkeleton = () => {
    return (
        <div className={cls.item}>
            <div className={cls.item__time}>
                <Skeleton.Node active style={{ width: '16px', height: '16px' }}> </Skeleton.Node>
                <Skeleton.Node active style={{ width: '34px', height: '18px' }}> </Skeleton.Node>
            </div>
            <div className={cls.item__content}>
                <div className={cls.item__content__text}>
                    <div className={cls.item__content__text__title}>
                        <Skeleton.Node active style={{ width: '100%', height: '16px' }}> </Skeleton.Node>
                        <Skeleton.Node active style={{ width: '70%', height: '16px' }}> </Skeleton.Node>
                    </div>
                    <Skeleton.Node active style={{ width: '70px', height: '11px' }}> </Skeleton.Node>
                </div>
                <Skeleton.Node active style={{ width: '80px', height: '13px' }}> </Skeleton.Node>
            </div>
            <div style={{padding: '3px 11px'}}>
            <Skeleton.Node active style={{ width: '3px', height: '13px' }}> </Skeleton.Node>
            </div>
        </div>
    );
}

export default NewsSkeleton;
