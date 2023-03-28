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
    ...other
}) => {
    return (
        <label className={cls.label}>
            <div className={cls.label__wrapper}>
                {label}
                {/* <Avatar.Group>
                    <Tooltip title="It's me">
                        <Avatar size={'default'} src={'https://storage.bright.getter.uz/image/c0c9af14-c613-4546-9d7b-67ef08c359ecphoto_2020-11-26_10-00-17.jpg'}>
                        </Avatar>
                    </Tooltip>
                    <Tooltip title="It's me">
                        <Avatar size={'default'} icon={<LetteredAvatar size="14" />}>
                        </Avatar>
                    </Tooltip>
                </Avatar.Group> */}
            </div>
            <input type={type} placeholder={placeholder} {...{ [value && 'value']: value }} {...register} {...other} />
        </label>
    );
}

export default Input;
