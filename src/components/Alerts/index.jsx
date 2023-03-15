import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const Alerts = () => {
    const { alerts } = useSelector(state => state.alert)
    useEffect(() => {
        if(alerts?.length > 0) {
            alerts.forEach(alert => {
                switch (alert?.type) {
                    case 'error': toast.error(alert?.message); break;
                    case 'success': toast.success(alert?.message); break;
                    default: break;
                }
            })
        }
    }, [alerts])

    return <Toaster />
}

export default Alerts;
