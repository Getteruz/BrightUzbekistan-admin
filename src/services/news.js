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

export const getPublishedNews = async (params) => {
    try {
        params = Object.entries(params)?.map(param => param.join('='))?.join('&')
        const res = await api.get(`/news/published?${params}`)
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}


export const getMyNews = async (params) => {
    try {
        params = Object.entries(params)?.map(param => param.join('='))?.join('&')
        const res = await api.get(`/news/my-news?${params}`)
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        }
        return res?.data
    } catch (error) {
        console.log(error);
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const publishNews = async (newsIds) => {
    try {
        const res = await api.patch('/news/published', {newsIds})
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}