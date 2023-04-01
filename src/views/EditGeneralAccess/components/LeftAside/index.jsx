import { useState } from 'react';
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
    const socket = useSocket()
    const [editors, setEditors] = useState([])
    const navigate = useNavigate()
    const { watch } = useForm
    const editorsFile = watch('editors')
    console.log(editorsFile);
    useEffect(() => {
        socket.on('set_editor', data => {
            
        })
        socket.on('input_focus', data => {
            setEditors(state => {
                return state.map(edit => {
                    return data?.userId === edit?.editor?.id ?  {...edit, editor: {...edit?.editor, editing: true}} : edit
                })
            })
        })
        socket.on('input_blur', data => {
            setEditors(state => {
                return state.map(edit => {
                    return data?.userId === edit?.editor?.id ?  {...edit, editor: {...edit?.editor, editing: false}} : edit
                })
            })
        })
    }, [])

    useEffect(() => {
        setEditors(
            editorsFile
                ?.map(edit => ({id: edit?.id, editor: { ...edit.editor, lastEdited: edit.editedDate }}))
                ?.sort((a, b) => new Date(b?.editor?.lastEdited) - new Date(a?.editor?.lastEdited))
        )
    }, [editorsFile])
    return (
        <LeftAsideWrapper>
            <RoundedButton onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <Flex gap='15' direction='column' alignItems='flex-start'>
                {/* <UsersGroup label='Создатель' users={[value?.creator]} /> */}
                <p>Редактировали</p>
                <UsersGroup label='Сегодня' users={editors?.map(edit => edit.editor)} />
            </Flex>
            <Flex gap='11' direction='column' alignItems='flex-start'>
                <SimpleButton>Как создать?</SimpleButton>
                <SimpleButton light={true}>Последние новости</SimpleButton>
            </Flex>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
