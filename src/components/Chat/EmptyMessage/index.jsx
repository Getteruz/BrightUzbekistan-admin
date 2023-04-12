import cls from './EmptyMessage.module.scss'

const EmptyMessage = () => {
    return (
        <div className={cls.block}>
            <img src='/empty-message.svg' />
            <span>Здесь пока ничего нет...</span>
            <span>Напишите сообщение, чтобы начать беседу.</span>
        </div>
    );
}

export default EmptyMessage;
