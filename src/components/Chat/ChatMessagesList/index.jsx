import { useLayoutEffect } from 'react';
import { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage';
import cls from './ChatMessagesList.module.scss'

const ChatMessagesList = () => {
    const list = useRef()

    useEffect(() => {
        console.log(list.current.scrollHeight - list.current.clientWidth  );
        setTimeout(() => {
            list.current.scrollTo({top: list.current.scrollHeight - list.current.clientWidth})
        }, 1)
    }, [])
    return (
        <div className={cls.list} ref={list}>
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage reverse={true} />
        </div>
    );
}

export default ChatMessagesList;
