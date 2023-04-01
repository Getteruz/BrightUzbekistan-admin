import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";
import { api } from "./api";

const showAlert = useShowAlert(store.dispatch)

export const login = async (data) => {
    try {
        const res = await api.post('/auth/login', data, {withCredentials: true})
        return res?.data
    } catch (error) {
        showAlert({message:  error.data !== undefined ? error?.data?.message : error?.message})
    }
}

export const logout = async () => {
    try {
        const res = await api.post('/auth/logout')
        return res?.data
    } catch (error) {
        console.log(error);
        showAlert({message:  error.data !== undefined ? error?.data?.message : error?.message})
    }
}