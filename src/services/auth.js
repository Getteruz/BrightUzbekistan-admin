import { api } from "./api";

export const login = async (data) => {
    try {
        const res = await api.post('/auth/login', data, { withCredentials: false })
        return res?.data
    } catch (error) {
        return error
    }
}