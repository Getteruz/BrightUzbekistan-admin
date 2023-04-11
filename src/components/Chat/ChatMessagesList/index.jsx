import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from '../../icons';
import ChatMessage from '../ChatMessage';
import cls from './ChatMessagesList.module.scss'

const ChatMessagesList = () => {
    const list = useRef()
    const [isOpenBtn, setIsOpenBtn] = useState(true)

    useEffect(() => {
        const handleScroll = (e) => {
            if((e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 10) && isOpenBtn){
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
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage reverse={true} />
            <div 
                className={`${cls.scrollbtn} ${isOpenBtn ? cls.open : cls.close}`} 
                onClick={scrollToBottom}
            >
                <ChevronDown />
            </div>
        </div>
    );
}

export default ChatMessagesList;
