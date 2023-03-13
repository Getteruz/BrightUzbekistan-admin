import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import RedButton from '../../../../components/Buttons/RedButton';
import WhiteInput from '../../../../components/Form/WhiteInput';
import { RightIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loader';
import { login } from '../../../../services/auth';
import cls from './Form.module.scss'

const AuthForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const { register, formState: { isValid }, handleSubmit } = useForm({ mode: 'onChange' })

    const sendForm = async (data) => {
        try {
            setLoading(true)
            const res = await login(data)
            console.log(res);
            if (res?.error) {
                toast.error(res?.message)
            } else {
                navigate('/', {replace: false})
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={cls.form} onSubmit={handleSubmit(sendForm)}>
            {loading && <Loader text='Идет проверка данных...' />}
            <Toaster />
            <h2 className={cls.form__title}>Отобразить реальный позитивный имидж узбекских бизнесменов, привлечь внимание иностранных инвесторов</h2>
            <div className={cls.form__inputs}>
                <WhiteInput
                    placeholder='Redactor, Journalist, Super user'
                    type='text'
                    label='Введите логин, предоставленный руководством'
                    register={{ ...register('login', { required: true }) }}
                />
                <WhiteInput
                    placeholder='Пароль'
                    type='password'
                    label='Введите пароль'
                    register={{ ...register('password', { required: true, minLength: 8 }) }}
                />
                <RedButton disabled={!isValid} type='submit'>
                    Вход в аккаунт
                    <RightIcon />
                </RedButton>
            </div>
        </form>
    );
}

export default AuthForm;
