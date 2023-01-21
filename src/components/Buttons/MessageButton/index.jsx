import { MailIcon } from '../../icons';
import cls from './MessageButton.module.scss'

const MessageButton = ({className, active, notification, ...other}) => {
    return (
        <button className={`${cls.btn} ${active ? cls.active : ''} ${notification ? cls.message : ''}`} {...other}>
            <MailIcon />
        </button>
    );
}

export default MessageButton;
