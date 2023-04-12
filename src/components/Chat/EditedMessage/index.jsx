import { CloseIcon } from '../../icons';
import cls from './EditingMessage.module.scss'

const EditingMessage = ({
    onClose = () => { },
    value = ''
}) => {
    return (
        <div className={cls.edit}>
            <p className={cls.edit__msg}>{value}</p>
            <button onClick={onClose}>
                <CloseIcon />
            </button>
        </div>
    );
}

export default EditingMessage;
