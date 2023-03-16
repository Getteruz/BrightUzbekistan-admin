import { LoadingIcon } from "../../../../components/icons";
import cls from "./loader.module.scss"

const Loader = () => {
    return (
        <div className={cls.loader}>
            <div>
<LoadingIcon />
            </div>
        </div>
    );
}

export default Loader;
