import GreyButton from '../../Buttons/GreyButton';
import RedButton from '../../Buttons/RedButton';
import cls from './ConfirmModal.module.scss'

const ConfirmModal = ({
    title = '',
    desc = '',
    onCancel = () => {},
    onOk = () => {},
    okLabel = 'Сохранить',
    cancelLabel = 'Отменить'
}) => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.modal}>
                <div>
                    <h2 className={cls.modal__title}>{title}</h2>
                    <p className={cls.modal__desc}>{desc}</p>
                </div>
                <div className={cls.modal__btns}>
                    <button className={cls.modal__grey} onClick={onCancel}>{cancelLabel}</button>
                    <button className={cls.modal__red} onClick={onOk}>{okLabel}</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
