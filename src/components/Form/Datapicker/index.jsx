import { DatePicker } from 'antd';
import moment from 'moment';
import { CalendaIcon } from '../../icons';

import cls from './Datapicker.module.scss'

const Datapicker = ({ label, onChange, value = '' }) => {
    return (
        <div className={cls.datapicker}>
            <span className={cls.datapicker__label}>{label}</span>
            <DatePicker className={cls.custom} {...{[value && 'value']: moment(value, 'DD|MM|YYYY')}} format='DD|MM|YYYY' onChange={onChange} />
        </div>
    );
}

export default Datapicker;
