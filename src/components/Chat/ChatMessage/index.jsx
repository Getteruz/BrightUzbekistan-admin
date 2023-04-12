import { useEffect, useRef, useState } from 'react';
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

const colors = ['#D8EBF7', '#FAF3FF', '#E5F8EB', '#FCF7EA', '#FFEAE6']

const ChatMessage = ({
    id = '',
    message = '',
    admin = {},
    date = '',
    onClick = () => { }
}) => {
    const showAlert = useShowAlert(store.dispatch)
    const color = useRef(getRandomEl(colors))
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
        // {
        //     id: 2,
        //     label: 'Изменить',
        //     icon: <EditIcon />,
        //     onClick: async () => {
        //         // await deleteMessage()
        //     }
        // },
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
                    <div className={cls.msg__body} style={{ background: color.current }}>
                        {message}
                    </div>
                    <div className={cls.msg__options__btn} onClick={() => setIsOpenOptions(true)}>
                        <ThreeDots />
                        {isOpenOptions && <Options buttons={buttons} />}
                    </div>
                </div>
                <span className={cls.msg__time}>{hours}:{minutes}</span>
            </div>
        </div>
    );
}

export default ChatMessage;
