import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteMessage } from '../../../services/chat';
import { store } from '../../../store';
import { useShowAlert } from '../../../store/alert/alert.thunk';
import getRandomEl from '../../../utils/getRandomEl';
import parseTimestamp from '../../../utils/parseTimestamp';
import ChatProfile from '../ChatProfile';
import Options from '../Options';
import cls from './ChatMessage.module.scss'
import { CopyIcon, DeleteIcon, EditIcon, ThreeDots } from '../../icons';
import { getFromLocalStorage, saveToLocalStorage } from '../../../utils/localStorageService';
import useSocket from '../../../hooks/useSocket';

const colors = ['#D8EBF7', '#FAF3FF', '#E5F8EB', '#FCF7EA', '#FFEAE6']

const setColorToAdmin = (id) => {
    const color = getRandomEl(colors)
    saveToLocalStorage('admin-colors', {...getFromLocalStorage('admin-colors', {}), [id]: color})
    return color
}

const ChatMessage = ({
    id = '',
    message = '',
    admin = {},
    date = '',
    onClick = () => { },
    setState = () => {}
}) => {
    const showAlert = useShowAlert(store.dispatch)
    const socket = useSocket()
    const color = getFromLocalStorage('admin-colors', {})?.[admin?.id] ? getFromLocalStorage('admin-colors', {})?.[admin?.id] : setColorToAdmin(admin?.id)
    const { id: chatId } = useParams()
    const { hours, minutes } = parseTimestamp(date)
    const { user } = useSelector(state => state.auth)
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const [buttons, setButtons] = useState([])
    const queryClient = useQueryClient()

    admin = admin?.id === user?.id ? { ...user } : admin

    let buttonsList = [
        {
            id: 1,
            label: 'Копировать',
            icon: <CopyIcon />,
            onClick: () => {
                navigator.clipboard.writeText(message);
                showAlert({
                    type: 'success',
                    message: 'Текст скопирован в буфет обмена.',
                    position: 'top-right',
                    diration: 1000
                })
            }
        },
        {
            id: 2,
            label: 'Изменить',
            icon: <EditIcon fill='currentColor' />,
            onClick: async ({message, id}) => {
                setState({type: 'edit', value: message, id})
            }
        },
        {
            id: 3,
            label: 'Удалить',
            icon: <DeleteIcon />,
            onClick: async () => {
                const res = await deleteMessage(id)
                if(res?.status === 204){
                    queryClient.setQueryData(['chat', chatId], oldData => {
                        return {
                            ...oldData,
                            messages: oldData?.messages.filter(msg => msg.id !== id)
                        }
                    })
                    socket.emit('delete_message', {msgId: id, roomId: chatId})
                }
            }
        },
    ]

    useEffect(() => {
        setButtons(admin?.id === user?.id ? buttonsList : buttonsList?.filter(btn => btn.id === 1))
    }, [])

    return (
        <div
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
                    <div className={cls.msg__body} style={{ background: color }}>
                        {message}
                    </div>
                    <div className={cls.msg__options__btn} onClick={() => setIsOpenOptions(true)}>
                        <ThreeDots />
                        {isOpenOptions && <Options buttons={buttons} message={{message, id}} />}
                    </div>
                </div>
                <span className={cls.msg__time}>{hours}:{minutes}</span>
            </div>
        </div>
    );
}

export default ChatMessage;
