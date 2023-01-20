import { UploadIcon } from '../../../icons';
import cls from './Button.module.scss'

const Button = () => {
    return (
        <label className={cls.btn}>
            <UploadIcon />
            <input type="file" accept='image/*' />
        </label>
    );
}

export default Button;
