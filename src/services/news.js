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
        showAlert({ message: error?.data !== undefined ? error?.data?.message  : error?.message })
    }
}

export const getGeneralAccessNews = async (params) => {
    try {
        params = Object.entries(params)?.map(param => param.join('='))?.join('&')
        const res = await api.get(`/news/general_access?${params}`)
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

export const publishNews = async (body) => {
    try {
        const res = await api.patch('/news/published', body, { responseType: 'blob' })
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        } else {
            if (res.data?.type === 'application/zip') {
                var file = window.URL.createObjectURL(res.data);
                if (file) window.location.assign(file);
            }
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const deleteNews = async (body) => {
    try {
        const res = await api.delete('/news', { data: body })
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getNewsById = async (id) => {
    try {
        const res = await api.get(`/single-news/${id}`)
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })   
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const editNews = async (body, id) => {
    try {
        const res = await api.put(`/news/${id}`, body)
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const sendNews = async (body) => {
    try {
        const res = await api.post('/notification', body)
        if (res?.data?.error) {
            showAlert({ message: res?.data?.message })
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getMyNotifications = async () => {
    try {
        const res = await api.get('/notification/my-notifications')
        return res.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getNotifications = async () => {
    try {
        const res = await api.get('/notification')
        return res.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const notificationIsViewed = async (data) => {
    try {
        const res = await api.patch('/notification/isViewed', { data })
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}