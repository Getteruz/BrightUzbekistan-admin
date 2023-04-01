import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import Flex from '../../../../components/Flex';
import { LeftIcon } from '../../../../components/icons';
import UsersGroup from '../../../../components/UsersGroup';
import useSocket from '../../../../hooks/useSocket';

const LeftAside = ({ useForm }) => {
    const navigate = useNavigate()
    const socket = useSocket()
    const { getValues } = useForm
    const value = getValues()
    const editors = value?.editors?.map(edit => ({...edit.editor, lastEdited: edit.editedDate}))

    useEffect(() => {
        socket.on('set_editor', data => console.log("data"))
    })
    return (
        <LeftAsideWrapper>
            <RoundedButton onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                <UsersGroup label='Создатель' users={[value?.creator]} />
                <p>Редактировали</p>
                <UsersGroup label='Сегодня' users={editors} />
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
                <SimpleButton>Как создать?</SimpleButton>
                <SimpleButton light={true}>Последние новости</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
