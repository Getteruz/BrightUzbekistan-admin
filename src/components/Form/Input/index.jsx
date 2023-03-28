import { Avatar, Tooltip } from 'antd';
import LetteredAvatar from 'react-lettered-avatar';
import cls from './Input.module.scss'

const Input = ({
    name = '',
    type = 'text',
    placeholder = '',
    label = '',
    register = {},
    value = '',
    users = [],
    ...other
}) => {
    return (
        <label className={cls.label}>
            <div className={cls.label__wrapper}>
                {label}
                {users?.length > 0 &&
                    <Avatar.Group>
                        {
                            users?.map(user => (
                                <Tooltip title={user?.fullName} key={user?.id}>
                                    <Avatar 
                                        size={'default'} 
                                        {...{[user?.avatar && 'src']: user?.avatar}}
                                        {...{[!user?.avatar && 'icon']: <LetteredAvatar size="14" name={user?.fullName} />}}
                                    />
                                </Tooltip>
                            ))
                        }
                    </Avatar.Group>
                }
            </div>
            <input type={type} placeholder={placeholder} {...{ [value && 'value']: value }} {...register} {...other} />
        </label>
    );
}

export default Input;
