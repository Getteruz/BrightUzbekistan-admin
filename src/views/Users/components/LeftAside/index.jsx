import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import LeftAsideWrapper from "../../../../components/Aside/LeftAsideWrapper";
import WhiteButton from "../../../../components/Buttons/WhiteButton";
import { PlusIcon } from "../../../../components/icons";
import UsersGroup from "../../../../components/UsersGroup";
import { useGetWindowWidth } from "../../../../hooks/useGetWindowWith";
import { getAdmins } from "../../../../services/admin";
import cls from './LeftAside.module.scss'

const LeftAside = () => {
    const navigate = useNavigate()
    const { data } = useQuery('admins', getAdmins)
    const windowWidth = useGetWindowWidth()
    const admins = data?.reduce((acc, admin) => {
        const role = admin.position?.title
        acc[role]?.length > 0 ? acc[role] = [...acc[role], admin] : acc[role] = [admin]
        return acc
    }, {})
    console.log(admins);
    return (
        <LeftAsideWrapper>
            <WhiteButton style={{ padding: '11px 19px' }} onClick={() => navigate('/adduser')}>
                <PlusIcon />
                Создать {windowWidth > 1350 && 'пользователя'}
            </WhiteButton>
            <div className={cls.aside__contacts}>
                {
                    data?.length > 0 && Object.entries(admins)?.map((admin, index) =>
                        <UsersGroup key={index} label={admin[0]} users={admin[1]} />
                    )
                }
            </div>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
