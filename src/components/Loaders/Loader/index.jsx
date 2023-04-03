import cls from './Loader.module.scss'

const Loader = ({
    text = ''
}) => {
    return (
        <div className={cls.loader}>
            <div>
                <img src="/loader.gif" />
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Loader;
