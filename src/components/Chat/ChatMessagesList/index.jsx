import { useRef, useEffect, useState } from 'react';
import ChatMessage from '../ChatMessage';
import ScrollBtn from '../ScrollBtn';
import cls from './ChatMessagesList.module.scss'

const ChatMessagesList = ({messages = []}) => {
    const list = useRef()
    const [isOpenBtn, setIsOpenBtn] = useState(false)

    useEffect(() => {
        const handleScroll = (e) => {
            if((e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 20)){
                setIsOpenBtn(false)
            } else if((e.target.scrollTop + e.target.clientHeight <= e.target.scrollHeight - 10)){
                setIsOpenBtn(true)
            }
        }

        setTimeout(() => {
            list.current.scrollTo({top: list.current.scrollHeight - list.current.clientWidth})
        }, 1)

        list.current.addEventListener('scroll', handleScroll)
        return () => list.current.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToBottom = () => {
        list.current.scrollTo({top: list.current.scrollHeight, behavior: 'smooth'})
    }

    return (
        <div className={cls.list} ref={list}>
            {
                messages?.length > 0 && messages?.map(msg => (
                    <ChatMessage 
                        key={msg?.id}
                        message={msg?.body}
                        admin={msg?.user}
                        date={msg?.date}
                    />
                ))
            }
            <ScrollBtn onClick={scrollToBottom} isOpenBtn={isOpenBtn} />
        </div>
    );
}

export default ChatMessagesList;
