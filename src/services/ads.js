import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";
import { api } from "./api";

const showAlert = useShowAlert(store.dispatch)

export const getAds = async () => {
    try {
        const res = await api.get('/advertisement')
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const createAds = async (body) => {
    try {
        const res = await api.post('/advertisement', body)
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getByIdAds = async (id) => {
    try {
        const res = await api.get(`/advertisement/single/${id}`)
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const editAds = async (id, body) => {
    try {
        const res = await api.put(`/advertisement/${id}`, body)
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const changeStatus = async (body) => {
    try {
        const res = await api.patch('/advertisement/isActive', body)
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const removeAds = async (body) => {
    try {
        const res = await api.delete('/advertisement/remove', {data: body})
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}