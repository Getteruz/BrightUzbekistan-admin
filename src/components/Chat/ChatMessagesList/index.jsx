import { forwardRef, useLayoutEffect } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircleLoader from '../../Loaders/CircleLoader'
import { saveToLocalStorage, getFromLocalStorage } from '../../../utils/localStorageService';
import ChatMessage from '../ChatMessage';
import EmptyMessage from '../EmptyMessage';
import ScrollBtn from '../ScrollBtn';
import cls from './ChatMessagesList.module.scss'


const ChatMessagesList = forwardRef(({ messages = [], loading = false }, ref) => {
    const list = ref
    const timer = useRef()
    const { id } = useParams()
    const [isOpenBtn, setIsOpenBtn] = useState(false)

    const scrollToBottom = () => {
        list.current.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' })
    }

    useEffect(() => {
        const onScrollEnd = (e) => {
            saveToLocalStorage('chat_scroll_pos', { ...getFromLocalStorage('chat_scroll_pos', {}), [id]: e.target.scrollTop })
        }

        const handleScroll = (e) => {
            if ((e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 20)) {
                setIsOpenBtn(false)
            } else if ((e.target.scrollTop + e.target.clientHeight <= e.target.scrollHeight - 20)) {
                setIsOpenBtn(true)
            }

            clearTimeout(timer.current);
            timer.current = setTimeout(() => onScrollEnd(e), 200);
        }

        list.current.addEventListener('scroll', handleScroll)
    }, [])

    useLayoutEffect(() => {
        setTimeout(() => {
            list.current.scrollTo({ top: getFromLocalStorage('chat_scroll_pos', {})?.[id] })
        }, 0)
    }, [messages])

    return (
        <div className={cls.list} ref={list} id='chat'>
            {
                loading ? <CircleLoader /> : messages?.length > 0 ? messages?.map(msg => (
                    <ChatMessage
                        key={msg?.id}
                        id={msg?.id}
                        message={msg?.body}
                        admin={msg?.user}
                        date={msg?.date}
                    />
                )) : <EmptyMessage />
            }
            <ScrollBtn onClick={scrollToBottom} isOpenBtn={isOpenBtn} />
        </div>
    );
})

export default ChatMessagesList;
