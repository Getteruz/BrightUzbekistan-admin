import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import cls from './Datapicker.module.scss'

const Datapicker = ({ 
    label, 
    onChange, 
    value,
    rounded = true,
    // minWidth =  
}) => {
    const date = new Date(value)?.getDate()
    const month = new Date(value)?.getMonth() + 1
    const year = new Date(value)?.getFullYear()

    return (
        <div className={cls.datapicker}>
            <span className={cls.datapicker__label}>{label}</span>
            <DatePicker 
                className={rounded ? cls.rounded : cls.square}
                format='DD|MM|YYYY'
                onChange={onChange}
                {...{[value !== undefined && value !== null && 'value']: dayjs(`${date}|${month}|${year}`, 'DD-MM-YYYY')}}
            />
        </div>
    );
}

export default Datapicker;