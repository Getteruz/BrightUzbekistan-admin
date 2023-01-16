import RedButton from '../../../../components/Buttons/RedButton';
import Input from '../../../../components/Form/Input';
import { RightIcon } from '../../../../components/icons';
import cls from './Form.module.scss'

const AuthForm = () => {
    return (
        <form className={cls.form}>
               <h2 className={cls.form__title}>Отобразить реальный позитивный имидж узбекских бизнесменов, привлечь внимание иностранных инвесторов</h2>
                <div className={cls.form__inputs}>
                    <Input 
                        placeholder='Redactor, Journalist, Super user'
                        type='text'
                        label='Введите логин, предоставленный руководством'
                    />
                    <RedButton>
                        Вход в аккаунт
                        <RightIcon />
                    </RedButton>
                </div>
        </form>
    );
}

export default AuthForm;
