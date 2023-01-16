import AuthForm from './components/Form';
import cls from './Auth.module.scss'
import { GlobusIcon } from '../../components/icons';

const AuthPage = () => {
  return (
    <div className={cls.auth}>
        <img className={cls.auth__logo} src="/Logo.svg" alt="Bright Uzbekistan logo" />
        <p className={cls.auth__desc}>Основная миссия проекта – рассказать об условиях ведения бизнеса в новом Узбекистане</p>
        <AuthForm />
        <div className={cls.auth__help}>
          <span className={cls.auth__help__text}>Нужна помощь?</span>
          <a className={cls.auth__help__link} href='tel:+9989012345067'>+998 90 123-45067</a>
        </div>
        <div className={cls.auth__bgimage}>
          <GlobusIcon />
        </div>
    </div>
  );
}

export default AuthPage;
