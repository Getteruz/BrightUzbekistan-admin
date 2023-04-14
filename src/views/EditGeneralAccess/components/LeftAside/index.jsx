import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftIcon } from '../../../../components/icons';
import LeftAsideWrapper from '../../../../components/Aside/LeftAsideWrapper';
import RoundedButton from '../../../../components/Buttons/RoundedButton';
import SimpleButton from '../../../../components/Buttons/SimpleButton';
import Flex from '../../../../components/Flex';
import UsersGroup from '../../../../components/UsersGroup';
import useSocket from '../../../../hooks/useSocket';
import cls from './LeftAside.module.scss'

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

const LeftAside = ({ useForm }) => {
    const socket = useSocket()
    const [editors, setEditors] = useState({})
    const navigate = useNavigate()
    const { watch } = useForm
    const editorsFile = watch('editors')
    const creator = watch('creator')

    useEffect(() => {
        socket.on('set_editor', data => {
            const key = new Date(data?.editedDate)?.toLocaleDateString('ru-Ru', options)
            setEditors(state => {
                return {
                    ...state,
                    [key]: Array.isArray(state?.[key]) ?
                        state?.[key]?.some(st => st.id === data?.editor?.id) ?
                            state?.[key]?.map(editor => editor?.id === data?.editor?.id
                                ? { ...editor, lastEdited: data?.editedDate }
                                : editor)
                            : [{ ...data?.editor, lastEdited: data?.editedDate }, ...state?.[key]]
                        : [{ ...data?.editor, lastEdited: data?.editedDate }]
                }
            })
        })
        socket.on('input_focus', data => {
            setEditors(state => {
                const key = Object.keys(state)?.find(date => state?.[date]?.find(editor => editor?.id === data?.userId))
                return key ? {
                    ...state,
                    [key]: state?.[key]?.map(editor => editor.id === data?.userId ? { ...editor, editing: true } : editor)
                } : state
            })
        })
        socket.on('input_blur', data => {
            setEditors(state => {
                const key = Object.keys(state)?.find(date => state?.[date]?.find(editor => editor?.id === data?.userId))
                return key ? {
                    ...state,
                    [key]: state?.[key]?.map(editor => editor.id === data?.userId ? { ...editor, editing: false } : editor)
                } : state
            })
        })
    }, [])

    useEffect(() => {
        setEditors(
            editorsFile
                ?.map(edit => ({ id: edit?.id, editor: { ...edit?.editor, lastEdited: edit?.editedDate } }))
                ?.sort((a, b) => new Date(b?.editor?.lastEdited) - new Date(a?.editor?.lastEdited))
                ?.reduce((acc, curr) => {
                    const key = new Date(curr?.editor?.lastEdited)?.toLocaleDateString('ru-Ru', options)
                    return {
                        ...acc,
                        [key]: Array.isArray(acc?.[key]) ? [...acc?.[key], curr?.editor] : [curr?.editor]
                    }
                }, {})
        )
    }, [editorsFile])

    return (
        <LeftAsideWrapper>
            <RoundedButton onClick={() => navigate(-1)}>
                <LeftIcon />
                Назад
            </RoundedButton>
            <div className={cls.editors}>
                <Flex gap='15' direction='column' alignItems='flex-start'>
                    <UsersGroup label='Создатель' users={[creator]} />
                    <p>Редактировали</p>
                    {
                        Object.entries(editors || {})?.length > 0 && Object.entries(editors || {}).map((edit) => (
                            <UsersGroup key={edit?.[0]} label={edit?.[0]} users={edit?.[1]} />
                        ))
                    }
                </Flex>
            </div>
            <span></span>
        </LeftAsideWrapper>
    );
}

export default LeftAside;
