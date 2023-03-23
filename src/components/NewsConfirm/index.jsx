import { useRef } from 'react';
import Instagram from '../Buttons/Instagram';
import OrangeBlurButton from '../Buttons/OrangeBlurButton';
import PrimaryButton from '../Buttons/PrimaryButton';
import Telegram from '../Buttons/Telegram';
import cls from './NewsConfirm.module.scss'

const NewsConfirm = ({onOk, onReject, onClickOutside = () => {}}) => {
    const modalRef = useRef()

    const handleClick = (e) => {
        if(!modalRef.current.contains(e.target)) {
            onClickOutside()
        }
    }

    return (
        <div className={cls.wrapper} onClick={handleClick}>
            <div className={cls.modal} ref={modalRef}>
                <h2 className={cls.modal__title}>Модальное окно</h2>
                <p className={cls.modal__desc}>В этом окне предпринимается действие по обработке некоторой информации и выполнению над ней какой-либо операции.</p>
                <div className={cls.modal__btnwrapper}>
                    <Telegram label='Telegram channel' />
                    <Instagram label='Download .img Instagram' />
                </div>
                <div className={cls.modal__btns}>
                    <PrimaryButton onClick={onOk}>Да и опубликовать</PrimaryButton>
                    <OrangeBlurButton onClick={onReject}>На редактирование</OrangeBlurButton>
                </div>
            </div>
        </div>
    );
}

export default NewsConfirm;
