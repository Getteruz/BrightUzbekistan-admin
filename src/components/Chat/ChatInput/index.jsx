import autoGrow from '../../../utils/autoGrow';
import { MainForward } from '../../icons';
import cls from './ChatInput.module.scss'

const ChatInput = () => {
    return (
        <div className={cls.input}>
            <textarea 
                placeholder='Пишите сюда'  
                wrap="hard" 
                onInput={autoGrow}
            />
            <button>
                <MainForward />
            </button>
        </div>
    );
}

export default ChatInput;
