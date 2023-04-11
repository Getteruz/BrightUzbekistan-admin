import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import ChatInput from '../../../../components/Chat/ChatInput';
import ChatMessagesList from '../../../../components/Chat/ChatMessagesList';
import ChatNavbar from '../../../../components/Chat/ChatNavbar';
import useSocket from '../../../../hooks/useSocket';
import { getChatMessages, postMessage } from '../../../../services/chat';
import cls from './RightAside.module.scss'

const RightAside = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()
    const socket = useSocket()
    const { data: chat, isLoading } = useQuery(['chat', id], () => getChatMessages(id))
    const mutation = useMutation(({body, id}) => postMessage(body, id), {
        onSuccess: (res) => {
            queryClient.setQueryData(['chat', id], (oldData) => {
                socket.emit('new_message', {msgId: res?.id, roomId: id})
                oldData = {...oldData, messages: oldData?.messages || []}
                oldData?.messages.push(res)
                return oldData
            })
        }
    })

    const handleSubmit = async (value) => {
        if(!value || !chat?.id) return
        const body = {body: value}
        mutation.mutate({body, id: chat?.id})
    } 
    
    useEffect(() => {
        socket.on('get_new_message', data => {
            
            console.log(data);
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
                    isLoading={isLoading}
                    messages={chat?.messages || []}
                />
            </div>
            <ChatInput onSubmit={handleSubmit} />
        </div>
    );
}

export default RightAside;
