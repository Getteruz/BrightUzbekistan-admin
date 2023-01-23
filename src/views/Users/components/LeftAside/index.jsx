import LeftAsideWrapper from "../../../../components/Aside/LeftAsideWrapper";
import WhiteButton from "../../../../components/Buttons/WhiteButton";
import { PlusIcon } from "../../../../components/icons";
import UserItem from "../../../../components/UserItem";
import UsersGroup from "../../../../components/UsersGroup";
import cls from './LeftAside.module.scss'

const LeftAside = () => {
    return (
        <LeftAsideWrapper>
            <WhiteButton>
                <PlusIcon />
                Создать пользователя
            </WhiteButton>
            <div className={cls.aside__contacts}>
                <UsersGroup label="Глава организации" users={Array(4).fill(null)} />
                <UsersGroup label="Журналисты" users={Array(6).fill(null)} />
                <UsersGroup label="Репортёры" users={Array(2).fill(null)} />
            </div>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
