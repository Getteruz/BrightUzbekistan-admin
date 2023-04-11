import cls from './ChatNavbar.module.scss'

const ChatNavbar = () => {
    return (
        <div className={cls.navbar}>
                <div>
                    <div className={cls.navbar__title}>Общий чат</div>
                    {/* <span className={cls.notification}>12</span> */}
                </div>
            </div>
    );
}

export default ChatNavbar;
