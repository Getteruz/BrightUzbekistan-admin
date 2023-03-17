import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";
import { api } from "./api";

const showAlert = useShowAlert(store.dispatch)

export const createNews = async (data) => {
    try {
        const res = await api.post('/news', data)
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getNews = async () => {
    try {
        const res = await api.get('/news')
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getNewsByCategory = async (id) => {
    try {
        const res = await api.get(`/news/?categoryId=${id}`)
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getMyNews = async () => {
    try {
        const res = await api.get('/news/my-news')
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        }
        return res?.data
    } catch (error) {
        console.log(error);
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}
