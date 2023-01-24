import RightAsideWrapper from "../../../../components/Aside/RightAsideWrapper";
import Switch from "../../../../components/Form/Switch";
import SwitchGroup from "../../../../components/SwitchGroup";


const RightAside = () => {
    return (
        <RightAsideWrapper>
            <SwitchGroup label="Пользовательские роля">
                <Switch label='Руководитель' type="radio" name="role" />
                <Switch label='Журналисть' type="radio" name="role" />
                <Switch label='Редактор' type="radio" name="role" />
                <Switch label='Менеджер' type="radio" name="role" />
                <Switch label='Глав Редактор' type="radio" name="role" />
                <Switch label='Репортёр' type="radio" name="role" />
            </SwitchGroup>
            <SwitchGroup label="Пользовательские функции">
                <Switch label='Добавить новости' />
                <Switch label='Редактировать новости' />
                <Switch label='Проверка' />
                <Switch label='Создать пользователя' />
                <Switch label='Изменить дата' />
                <Switch label='Реклама' />
                <Switch label='Статистика' />
                <Switch label='Архивировать' />
                <Switch label='Удалить' />
                <Switch label='Добавить страницы' />
                <Switch label='Настройка сайта' />
                <Switch label='Доступ к архивам' />
                <Switch label='Получать уведомления' />
            </SwitchGroup>
        </RightAsideWrapper>
    );
}

export default RightAside;
