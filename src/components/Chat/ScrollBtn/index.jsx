import { ChevronDown } from "../../icons";
import cls from './ScrollBtn.module.scss'

const ScrollBtn = ({
    onClick = () => {},
    isOpenBtn = false
}) => {
    return (
        <div
            className={`${cls.scrollbtn} ${isOpenBtn ? cls.open : cls.close}`}
            onClick={onClick}
        >
            <ChevronDown />
        </div>
    );
}

export default ScrollBtn;
