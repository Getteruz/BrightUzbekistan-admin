import { CalendaIcon } from '../../icons';
import cls from './Datapicker.module.scss'

const Datapicker = ({ label }) => {
    return (
        <div className={cls.datapicker}>
            <span className={cls.datapicker__label}>{label}</span>
            <label className={cls.label}>
                <CalendaIcon />
                <input type="date" />
                01|02|2022
            </label>
        </div>
    );
}

export default Datapicker;
