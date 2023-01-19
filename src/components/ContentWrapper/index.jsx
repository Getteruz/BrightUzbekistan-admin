import useGetSize from '../../hooks/useGetSize';
import cls from './ContentWrapper.module.scss'

const ContentWrapper = ({children}) => {
    const {height} = useGetSize('navbar')
    
    return (
        <div className={cls.wrapper} style={{maxHeight: `calc(100vh - ${height}px)`}}>
            {children}
        </div>
    );
}

export default ContentWrapper;
