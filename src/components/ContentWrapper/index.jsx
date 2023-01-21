import useGetSize from "../../hooks/useGetSize";
import cls from './ContetnWrapper.module.scss'

const ContentWrapper = ({children, navbar}) => {
    const { height } = useGetSize('content_nav')

    return (
        <div style={{maxHeight: '100%', display: 'flex', flexDirection: 'column'}}>
            <div id='content_nav' className={cls.navbar}>{navbar}</div>
            <div className={cls.wrapper} style={{ maxHeight: `calc(100% - ${height}px)` }}>
                {children}
            </div>
        </div>
    );
}

export default ContentWrapper;