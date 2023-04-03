import { store } from "../store"
import { useShowAlert } from "../store/alert/alert.thunk"
import { authActions } from "../store/auth/auth.slice"
import { api } from "./api"

const showAlert = useShowAlert(store.dispatch)

export const createAdmin = async (data) => {
    try {
        const res = await api.post('/admin', data, { withCredentials: true })
        return res?.data
    } catch (error) {
        showAlert({ message: error.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getAdmins = async () => {
    try {
        const res = await api.get('/admin')
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getAdminById = async (id) => {
    try {
        const res = await api.get(`/admin/${id}`)
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const getAdminInfo = async () => {
    try {
        const res = await api.get('/admin/me', { withCredentials: true })
        if(!res) {
            store.dispatch(authActions.logout())
        }
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const updateAdmin = async (id, data) => {
    try {
        const res = await api.put(`/admin/${id}`, data, { withCredentials: true })
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}

export const deleteAdmin = async (id) => {
    try {
        const res = await api.delete(`/admin/${id}`)
        return res?.data
    } catch (error) {
        showAlert({ message: error?.data !== undefined ? error?.data?.message : error?.message })
    }
}