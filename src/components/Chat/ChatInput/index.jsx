import { useRef } from 'react';
import autoGrow from '../../../utils/autoGrow';
import { MainForward } from '../../icons';
import cls from './ChatInput.module.scss'

const ChatInput = ({
    onSubmit = () => {}
}) => {
    const inputRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(inputRef.current.value?.trim()?.replace("\r\n", "\\r\\n"))
        inputRef.current.value = ''
        inputRef.current.style.height = '20px'
    }

    return (
        <form className={cls.input} onSubmit={handleSubmit}>
            <textarea 
                placeholder='Пишите сюда'  
                wrap="hard" 
                onChange={autoGrow}
                ref={inputRef}
            />
            <button type='submit'>
                <MainForward />
            </button>
        </form>
    );
}

export default ChatInput;
