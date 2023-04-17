import { useNavigate, useSearchParams } from 'react-router-dom';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import Avatar from '../../../../components/Avatar';
import cls from './RightAside.module.scss'

const RightAside = () => {
    const [params, setSearchParams] = useSearchParams()

    return (
        <RightAsideWrapper style={{ maxHeight: '700px', height: '100%', overflowY: 'auto' }}>
            <span className={cls.title}>Пользователи, имеющие доступ.</span>
            <div className={cls.users}>
                <Avatar name='nma g' onClick={() => setSearchParams({ ...params.entries(), user: 'ds' })} />
                <Avatar name='Salom' onClick={() => setSearchParams({ ...params.entries(), user: 'ds' })} />
            </div>
        </RightAsideWrapper>
    );
}

export default RightAside;
