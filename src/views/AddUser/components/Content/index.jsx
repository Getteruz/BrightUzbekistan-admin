import RedButton from "../../../../components/Buttons/RedButton";
import RoundedButton from "../../../../components/Buttons/RoundedButton";
import ContentWrapper from "../../../../components/ContentWrapper";
import Input from "../../../../components/Form/Input";
import Circle from "../../../../components/Form/Upload/Photo/Circle";
import RoleInfo from "../../../../components/RoleInfo";
import InputMask from "../../../../components/Form/InputMask";
import Select from "../../../../components/Form/Select";
import { roles, regions } from "./data";
import cls from './Content.module.scss'
import { useForm } from "react-hook-form";

const Content = () => {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onChange' })
    return (
        <ContentWrapper navbar={<div style={{ width: '100%', display: 'flex', gap: '5px', alignItems: 'center' }}>
            <RedButton>Сохранить</RedButton>
            <RoundedButton>Отмена</RoundedButton>
        </div>}>
            <div className={cls.box}>
                <div>
                    <Circle label="Аватарка" />
                </div>
                <div className={cls.form}>
                    <Input label="ФИО" placeholder="Фамилия Имя Отчество" />
                    <div className={cls.form__auth}>
                        <Select label='Город' placeholder="Места жительства" options={regions} />
                        <Input label="Оброзование" placeholder="Название учебного заведения" />
                    </div>
                    <div className={cls.form__auth}>
                        <div>
                            <h3>Придумайте логин</h3>
                            <p>Латинскими буквами и представьте его пользователю в письменном виде!</p>
                            <Input placeholder="Login" />
                        </div>
                        <div>
                            <h3>Номер телефона</h3>
                            <p>Логин будет отправлен на этот номер телефона в виде SMS!</p>
                            <InputMask mask='+\9\9\8 (99) 999-99-99' placeholder="+998 | (  ) ___ __ __"/>
                        </div>
                    </div>
                    <div className={cls.form__roles}>
                        {
                            roles?.length > 0 && roles.map(role =>
                                <RoleInfo key={role.id} title={role.title} desc={role.desc} label={role.label} />
                            )
                        }
                    </div>
                </div>
            </div>
        </ContentWrapper>
    );
}

export default Content;
