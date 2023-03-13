import RedButton from '../Buttons/RedButton';
import { CloseIcon } from '../icons';
import Successful from '../Marks/Successful';
import cls from './Modal.module.scss'

const Modal = ({
    onClose = () => { },
    onOk = () => { },
    title = '',
    desc = ''
}) => {
    return (
        <div className={cls.modal}>
            <div>
                <div className={cls.modal__close} onClick={onClose}>
                    <CloseIcon />
                </div>
                <Successful />
                <h3 className={cls.modal__title}>{title}</h3>
                <span className={cls.modal__desc}>{desc}</span>
                <RedButton 
                    className={cls.modal__btn}
                    onClick={onOk}
                >
                    Ok
                </RedButton>
            </div>
        </div>
    );
}

export default Modal;
