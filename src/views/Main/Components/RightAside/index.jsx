import Avatar from '../../../../components/Avatar';
import Flex from '../../../../components/Flex';
import Switch from '../../../../components/Form/Switch';
import Datapicker from '../../../../components/Form/Datapicker';
import RoundedInput from '../../../../components/Form/RoundedInput';
import RightAsideWrapper from '../../../../components/Aside/RightAsideWrapper';
import SwitchGroup from '../../../../components/SwitchGroup';
import DateGroup from '../../../../components/DateGroup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getAdminsByPermission } from '../../../../services/admin';
import cls from './RightAside.module.scss'
import paramsToObject from '../../../../utils/paramsToObject';
import { useEffect, useState } from 'react';

const RightAside = () => {
    const queryClient = useQueryClient()
    const [params, setSearchParams] = useSearchParams()
    const [filteredUsers, setFilteredUsers] = useState([])
    const { data: admins } = useQuery(
        ['admin', import.meta.env.VITE_CREATE_NEWS_ID || ''],
        ({ queryKey }) => getAdminsByPermission(queryKey?.[1])
    )

    const hanldeRadioChange = (e) => {
        if (e.target.checked) {
            setSearchParams({...paramsToObject(params.entries()), sort: e.target.value})
        } else {
            setSearchParams({...paramsToObject(params.entries()), sort: ''})
        }
    }

    const handleFilterUser = (e) => {
        setFilteredUsers(admins?.filter(admin => admin?.fullName?.toLowerCase()?.includes(e.target.value?.trim())))
    }

    useEffect(() => {
        setFilteredUsers(admins || [])
    }, [admins])

    return (
        <RightAsideWrapper>
            <Flex direction='column' gap='15'>
                <RoundedInput placeholder='username' label='По пользователю' onChange={handleFilterUser}/>
                <div className={cls.users}>
                    {
                        filteredUsers?.length > 0 && filteredUsers.map(admin => (
                            <Avatar
                                key={admin?.id}
                                src={admin?.avatar}
                                name={admin?.fullName}
                                onClick={() => setSearchParams({ ...paramsToObject(params.entries()), user: admin?.id })}
                            />
                        ))
                    }
                </div>
            </Flex>
            <SwitchGroup label='Сортировка'>
                <Switch
                    label='Неделе'
                    value='Неделе'
                    checked={params.get('sort') === 'Неделе'}
                    onChange={(e) => hanldeRadioChange(e, 'Неделе')}
                />
                <Switch
                    label='Месяц'
                    value='Месяц'
                    checked={params.get('sort') === 'Месяц'}
                    onChange={(e) => hanldeRadioChange(e)}
                />
                <Switch
                    label='Год'
                    value='Год'
                    checked={params.get('sort') === 'Год'}
                    onChange={(e) => hanldeRadioChange(e)}
                />
            </SwitchGroup>
            <DateGroup label='По дате'>
                <Datapicker label='от' />
                <Datapicker label='до' />
            </DateGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
