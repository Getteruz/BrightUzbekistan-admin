import { Avatar, Tooltip } from 'antd';
import LetteredAvatar from 'react-lettered-avatar'
import cls from './TextArea.module.scss'

const TextArea = ({ label = '', placeholder, register, users = [], ...other }) => {
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
                                        {...{[!user?.avatar && 'icon']: <LetteredAvatar name={user?.fullName} />}}
                                    />
                                </Tooltip>
                            ))
                        }
                    </Avatar.Group>
                }
            </div>
            <textarea placeholder={placeholder} {...register} {...other}></textarea>
        </label>
    );
}

export default TextArea;
