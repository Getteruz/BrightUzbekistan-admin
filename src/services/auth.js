import { api } from "./api";

export const login = async (data) => {
    try {
        const res = await api.post('/auth/login', data)
        return res?.data
    } catch (error) {
        return error
    }
}