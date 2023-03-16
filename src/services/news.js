import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";
import { api } from "./api";

const showAlert = useShowAlert(store.dispatch)

export const createNews = async (data) => {
    try {
        const res = await api.post('/news', data)
        return res?.data
    } catch (error) {
        showAlert({message:  error?.data !== undefined ? error?.data?.message : error?.message})
    }
}

export const getNews = async () => {
    try {
        const res = await api.get('/news')
        return res?.data
    } catch (error) {
        showAlert({message:  error?.data !== undefined ? error?.data?.message : error?.message})
    }
}

export const getNewsByCategory = async(id) => {
    try {
        const res = await api.get(`/news/category/${id}`)
        return res?.data
    } catch (error) {
        showAlert({message:  error?.data !== undefined ? error?.data?.message : error?.message})
    }
}
