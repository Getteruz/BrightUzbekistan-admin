import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import Avatar from '../../../../components/Avatar';
import cls from './RightAside.module.scss'

const RightAside = () => {
    return (
        <RightAsideWrapper style={{maxHeight: '700px', height: '100%', overflowY: 'auto'}}>
            <span className={cls.title}>Пользователи, имеющие доступ.</span>
            <div className={cls.users}>
                <Avatar name='nma g' />
                <Avatar name='Salom' />
            </div>
        </RightAsideWrapper>
    );
}

export default RightAside;
