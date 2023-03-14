import { api } from "./api"

export const createAdmin = async (data) => {
    try {
        const res = await api.post('/admin', data, { withCredentials: true })
        return res?.data
    } catch (error) {

    }
}

export const getAdmins = async () => {
    try {
        const res = await api.get('/admin')
        return res?.data
    } catch (error) {

    }
}

export const getAdminById = async (id) => {
    try {
        const res = await api.get(`/admin/${id}`)
        return res?.data
    } catch (error) {

    }
}