import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../../store';
import { useShowAlert } from '../../../store/alert/alert.thunk';
import getRandomEl from '../../../utils/getRandomEl';
import parseTimestamp from '../../../utils/parseTimestamp';
import { CopyIcon, ThreeDots } from '../../icons';
import ChatProfile from '../ChatProfile';
import Options from '../Options';
import cls from './ChatMessage.module.scss'

const colors = ['#D8EBF7', '#FAF3FF', '#E5F8EB', '#FCF7EA', '#FFEAE6']

const showAlert = useShowAlert(store.dispatch)

const buttons = [
    {
        id: 1,
        label: 'Копировать',
        icon: <CopyIcon />,
        onClick: ({message = ''}) => {
            navigator.clipboard.writeText(message);
            showAlert({
                type: 'success', 
                message: 'Текст скопирован в буфет обмена.', 
                position: 'top-right',
                diration: 1000
            })
        }
    },
    // {
    //     id: 2,
    //     label: 'Изменить',
    //     onClick: () => {

    //     }
    // },
    // {
    //     id: 3,
    //     label: 'Удалить',
    //     onClick: () => {

    //     }
    // },
]

const ChatMessage = ({
    id = '',
    message = '',
    admin = {},
    date = '',
    onClick = () => { }
}) => {
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const color = useRef(getRandomEl(colors))
    const { user } = useSelector(state => state.auth)
    admin = admin?.id === user?.id ? { ...user } : admin
    const { hours, minutes } = parseTimestamp(date)

    return (
        <div
            id='chat'
            onClick={onClick}
            className={`${cls.msg} ${admin?.id === user?.id ? cls.reverse : ''}`}
            onMouseLeave={() => setIsOpenOptions(false)}
        >
            <ChatProfile
                id={admin?.id}
                avatar={admin?.avatar}
                fullName={admin?.fullName}
                role={admin?.position?.title}
                isMyMsg={admin?.id === user?.id}
            />
            <div className={cls.msg__wrapper}>
                <div className={cls.msg__options}>
                    <div className={cls.msg__body} style={{ background: color.current }}>
                        {message}
                    </div>
                    <div className={cls.msg__options__btn} onClick={() => setIsOpenOptions(true)}>
                        <ThreeDots />
                        {isOpenOptions && <Options buttons={buttons} message={{id, message}} />}
                    </div>
                </div>
                <span className={cls.msg__time}>{hours}:{minutes}</span>
            </div>
        </div>
    );
}

export default ChatMessage;
