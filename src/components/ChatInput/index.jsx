import { MainForward } from '../icons';
import cls from './ChatInput.module.scss'

const ChatInput = () => {
    return (
        <div className={cls.input}>
            <textarea type="text" />
            <button>
                <MainForward />
            </button>
        </div>
    );
}

export default ChatInput;
