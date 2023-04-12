import { ChevronDown } from "../../icons";
import cls from './ScrollBtn.module.scss'

const ScrollBtn = ({
    onClick = () => { },
    isOpenBtn = false
}) => {
    return (
        <div
            className={`${cls.scrollbtn} ${isOpenBtn ? cls.open : cls.close}`}
            onClick={onClick}
        >
            <div>
                <ChevronDown />
                {/* <span className={cls.scrollbtn__notification}>1</span> */}
            </div>
        </div>
    );
}

export default ScrollBtn;
