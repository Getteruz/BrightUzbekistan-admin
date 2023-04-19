import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import Avatar from '../../../../components/Avatar';
import { getAdminsByPermission } from '../../../../services/admin';
import paramsToObject from '../../../../utils/paramsToObject';
import cls from './RightAside.module.scss'

const RightAside = () => {
    const [params, setSearchParams] = useSearchParams()
    const {data: admins} = useQuery(
        ['admin', import.meta.env.VITE_CREATE_NEWS_ID || ''], 
        ({queryKey}) => getAdminsByPermission(queryKey?.[1])
    )

    return (
        <RightAsideWrapper style={{ maxHeight: '700px', height: '100%', overflowY: 'auto' }}>
            <span className={cls.title}>Пользователи, имеющие доступ.</span>
            <div className={cls.users}>
                {
                    admins?.length > 0 && admins.map(admin => (
                        <Avatar 
                            key={admin?.id}
                            src={admin?.avatar}
                            name={admin?.fullName} 
                            onClick={() => setSearchParams({ ...paramsToObject(params.entries()), user: admin?.id })} 
                        />
                    ))
                }
            </div>
        </RightAsideWrapper>
    );
}

export default RightAside;
