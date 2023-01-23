import Flex from '../Flex';
import UserItem from '../UserItem';
import cls from './UsersGroup.module.scss'

const UsersGroup = ({users = [], label = ''}) => {
    return (
        <div className={cls.group}>
            <h4>{label}</h4>
            <Flex direction='column' gap='10'>
                {
                    users?.length > 0 && users.map((_, index) => <UserItem key={index} />)
                }
            </Flex>
        </div>
    );
}

export default UsersGroup;
