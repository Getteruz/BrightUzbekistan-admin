import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";
import { api } from "./api";

const showAlert = useShowAlert(store.dispatch)

export const getChatMessages = async (id) => {
    try {
        const {data} = await api.get(`/chat/${id}`)
        return data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const postMessage = async (body, id) => {
    try {
        const {data} = await api.post(`/message/${id}`, body)
        return data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}