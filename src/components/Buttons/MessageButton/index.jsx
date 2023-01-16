import { MailIcon } from '../../icons';
import cls from './MessageButton.module.scss'

const MessageButton = ({className, active}) => {
    return (
        <button className={`${cls.btn} ${className ? className : ''} ${active ? cls.active : ''}`}>
            <MailIcon />
        </button>
    );
}

export default MessageButton;
