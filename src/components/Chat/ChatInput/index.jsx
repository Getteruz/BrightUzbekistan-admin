import { useEffect } from 'react';
import { useRef } from 'react';
import autoGrow from '../../../utils/autoGrow';
import { MainForward } from '../../icons';
import cls from './ChatInput.module.scss'

const ChatInput = ({
    onSubmit = () => {},
    state = {}
}) => {
    const inputRef = useRef()
    const formRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(inputRef.current.value?.trim()?.replace("\r\n", "\\r\\n"))
        inputRef.current.value = ''
        inputRef.current.style.height = '20px'
    }

    const handleKeyDown = (event) => {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event)
        } else if (event.keyCode == 13 && event.shiftKey) {
            event.preventDefault();
            event.target.value += '\n';
            autoGrow(event)
        }
    }

    useEffect(() => {
        if(state.type === 'edit') {
            inputRef.current.value = state.value
        } else {
            inputRef.current.value = '' 
        }
    }, [state.type])

    return (
        <form className={cls.input} onSubmit={handleSubmit} ref={formRef}>
            <textarea 
                placeholder='Написать сообщение...'  
                wrap="hard" 
                onChange={autoGrow}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <button type='submit'>
                <MainForward />
            </button>
        </form>
    );
}

export default ChatInput;
