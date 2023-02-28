import { UploadIcon } from '../../../icons';
import cls from './Button.module.scss'

const Button = () => {
    return (
        <div className={cls.btn}>
            <UploadIcon />
            {/* <input type="file" accept='image/*' /> */}
        </div>
    );
}

export default Button;
