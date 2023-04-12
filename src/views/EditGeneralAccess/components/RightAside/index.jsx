import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import ChatInput from '../../../../components/Chat/ChatInput';
import ChatMessagesList from '../../../../components/Chat/ChatMessagesList';
import ChatNavbar from '../../../../components/Chat/ChatNavbar';
import EditingMessage from '../../../../components/Chat/EditedMessage';
import useSocket from '../../../../hooks/useSocket';
import { editMessage, getChatMessages, postMessage } from '../../../../services/chat';
import cls from './RightAside.module.scss'

const RightAside = () => {
    const listRef = useRef()
    const { id } = useParams()
    const socket = useSocket()
    const queryClient = useQueryClient()
    const [state, setState] = useState({type: '', value: ''})
    const { data: chat, isLoading } = useQuery(['chat', id], () => getChatMessages(id))

    const create = useMutation(({body, id}) => postMessage(body, id), {
        onSuccess: (res) => {
            queryClient.setQueryData(['chat', id], (oldData) => {
                socket.emit('new_message', {msgId: res?.id, roomId: id})
                oldData = {...oldData, messages: oldData?.messages || []}
                oldData?.messages.push(res)
                return oldData
            })
            setTimeout(() => {
                listRef.current.scrollTo({top: listRef.current.scrollHeight, behavior: 'smooth'})
            }, 1)
        }
    })

    const edit = useMutation(({body, id}) => editMessage(body, id), {
        onSuccess: (res) => {
            queryClient.setQueryData(['chat', id], oldData => {
                return {
                    ...oldData,
                    messages: oldData.messages.map(msg => msg.id === res?.id ? {...msg, body: res.body} : msg)
                }
            })
            setState({type: null, value: null})
        }
    })

    const handleSubmit = async (value) => {
        if(!value || !chat?.id) return
        const body = {body: value}
        if(state.type === 'edit') {
            edit.mutate({body, id: state.id})
        } else {
            create.mutate({body, id: chat?.id})
        }
    } 
    
    useEffect(() => {
        socket.on('get_new_message', data => {
            queryClient.setQueryData(['chat', id], (oldData) => {
                oldData = {...oldData, messages: oldData?.messages || []}
                oldData?.messages.push(data)
                return oldData
            })
        })
    }, [])

    return (
        <div className={cls.chat}>
            <ChatNavbar />
            <div className={cls.chat__body}>
                <ChatMessagesList 
                    setState={setState}
                    loading={isLoading}
                    messages={chat?.messages || []}
                    ref={listRef}
                />
            </div>
            {state?.type === 'edit' && <EditingMessage value={state.value} onClose={() => setState({type: null, value: null})} />}
            <ChatInput onSubmit={handleSubmit} state={state} />
        </div>
    );
}

export default RightAside;
