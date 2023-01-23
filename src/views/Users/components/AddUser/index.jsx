import Avatar from '../../../../components/Avatar';
import BtnGroup from '../../../../components/Form/BtnGroup';
import { CheckCircle, LocationIcon } from '../../../../components/icons';
import NewsList from '../../../../components/NewsList';
import cls from './AddUser.module.scss'

const AddUser = () => {
    return (
        <div className={cls.box}>
           <span>Информация о ролях</span> 
           <div>
                <Avatar src='/avatar.png' size='lg' />
                <div className={cls.box__info}>
                    <div className={cls.box__info__nav}>
                        <h4>Убайдулла Ахмедов</h4>
                        <div>
                            <button>Удалить</button>
                            <button>Изменить</button>
                        </div>
                    </div>
                    <p className={cls.box__info__desc}>УЗБЕКИСТАНСКАЯ ЖУРНАЛИСТИКА И СВЯЗИ С ОБЩЕСТВЕННОСТЬЮ УНИВЕРСИТЕТ</p>
                    <div className={cls.box__user__info}>
                        <span>
                            <LocationIcon /> Самарканд    
                        </span>
                        <span>
                            <CheckCircle /> 17:56 Был в сети    
                        </span>
                    </div>
                    <div style={{marginBottom: '37px'}}>
                    <BtnGroup>
                        <button>Новости</button>
                        <button>Пияр статьи</button>
                        <button>Инфо</button>
                    </BtnGroup>
                    </div>
                    <NewsList news={Array(4).fill(null)} />
                </div>
           </div>
        </div>
    );
}

export default AddUser;
