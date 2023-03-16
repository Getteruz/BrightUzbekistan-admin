import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import RedButton from '../../../../components/Buttons/RedButton';
import WhiteInput from '../../../../components/Form/WhiteInput';
import { RightIcon } from '../../../../components/icons';
import Loader from '../../../../components/Loader';
import { login } from '../../../../services/auth';
import cls from './Form.module.scss'
import { useDispatch } from 'react-redux';
import { authActions } from '../../../../store/auth/auth.slice';

const AuthForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState()
    const [cookies, setCookie] = useCookies(['access_token_admin', 'refresh_token_admin'])
    const { register, formState: { isValid }, handleSubmit } = useForm({ mode: 'onChange' })

    const sendForm = async (data) => {
        try {
            setLoading(true)
            const res = await login(data)
            if (res?.error) {
                toast.error(res?.message)
            } else {
                setCookie('access_token_admin', res?.access_token_admin, { path: '/' })
                setCookie('refresh_token_admin', res?.refresh_token_admin, { path: '/' })
                dispatch(authActions.login())
                navigate('/', { replace: false })
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
                    register={{ ...register('password', { required: true, minLength: 1 }) }}
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
