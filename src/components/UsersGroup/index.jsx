import Flex from '../Flex';
import UserItem from '../UserItem';
import cls from './UsersGroup.module.scss'

const UsersGroup = ({users = [], label = ''}) => {

    return (
        <div className={cls.group}>
            <h4>{label}</h4>
            <Flex direction='column' gap='10'>
                {
                    users?.length > 0 && users.map((user, index) => 
                        <UserItem 
                            key={user?.id + index} 
                            id={user?.id}
                            name={user?.fullName}
                            role={user?.position?.title}
                            image={user?.avatar}
                            {...{
                                [user?.editing && 'editing']: user?.editing,
                                [user?.lastEdited && 'time']: user?.lastEdited
                            }}
                        />
                    )
                }
            </Flex>
        </div>
    );
}

export default UsersGroup;
