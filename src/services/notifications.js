import { api } from "./api";
import store from '../store'
import { useShowAlert } from "../store/alert/alert.thunk";

const showAlert = useShowAlert(store.dispatch)

export const getNotifications = () => {
    try {
        api.get('/notifications')
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}