import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import LetteredAvatar from 'react-lettered-avatar';
import Avatar from '../../../../components/Avatar';
import BtnGroup from '../../../../components/Form/BtnGroup';
import { CheckCircle, LocationIcon } from '../../../../components/icons';
import NewsList from '../../../../components/NewsList';
import { deleteAdmin, getAdminById } from '../../../../services/admin';
import cls from './UserInfo.module.scss'
import Loader from '../../../../components/Loaders/Loader';
import parseTimestamp from '../../../../utils/parseTimestamp';
import ConfirmModal from '../../../../components/Modals/ConfirmModal';
import { useState } from 'react';

const UserInfo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { data: admin, isLoading } = useQuery(['admin', id], async () => await getAdminById(id))
    const { hours, minutes, data, year, month } = parseTimestamp(admin?.lastSeen)
    const { data: today, year: currentYear, month: currentMonth } = parseTimestamp(Date.now())

    const deleteUser = async () => {
        await deleteAdmin(id)
        queryClient.invalidateQueries('admins')
        navigate('/users')
    }

    return (
        <div className={cls.box}>
            <span></span>
            <div>
                {isOpenModal && <ConfirmModal
                    title='Вы действительно хотите удалить пользователя ?'
                    desc='В дальнейшем нельзя будет восстановить аккаунт'
                    okLabel='Удалить'
                    onCancel={() => setIsOpenModal(false)}
                    onOk={deleteUser}
                />}
                {isLoading && <Loader text='Подгружаем данные...' />}
                {admin?.avatar ? <Avatar src={admin?.avatar} size='lg' /> : <LetteredAvatar size={120} name={admin?.fullName || '👻'} />}
                <div className={cls.box__info}>
                    <div className={cls.box__info__nav}>
                        <h4>{admin?.fullName}</h4>
                        <div>
                            <button onClick={() => setIsOpenModal(true)}>Удалить</button>
                            <button onClick={() => navigate(`/user/edit/${id}`)}>Изменить</button>
                        </div>
                    </div>
                    <p className={cls.box__info__desc}>{admin?.education}</p>
                    <div className={cls.box__user__info}>
                        <span>
                            <LocationIcon /> {admin?.city}
                        </span>
                        <span>
                            <CheckCircle /> {admin?.isOnline ?
                                'В сети' :
                                `Был(а) в ${(
                                    today === data &&
                                    currentMonth === month &&
                                    currentYear === year
                                ) ? '' : `${data} ${month} ${currentYear !== year ? year : ''}`} 
                            ${hours}:${minutes}`}
                        </span>
                    </div>
                    <div style={{ marginBottom: '37px' }}>
                        <BtnGroup>
                            <button>Новости</button>
                            <button>Пияр статьи</button>
                            <button>Инфо</button>
                        </BtnGroup>
                    </div>
                    <NewsList news={admin?.news} />
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
