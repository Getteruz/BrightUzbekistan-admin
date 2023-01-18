import { DatePicker } from 'antd';
import { CalendaIcon } from '../../icons';

import cls from './Datapicker.module.scss'

const Datapicker = ({ label }) => {
    return (
        <div className={cls.datapicker}>
            <span className={cls.datapicker__label}>{label}</span>
            <DatePicker className={cls.custom} format='DD|MM|YYYY' />
        </div>
    );
}

export default Datapicker;
