import { api } from "./api";

export const login = async (data) => {
    try {
        const res = await api.post('/auth/login', data, {withCredentials: true})
        console.log(res);
        return res?.data
    } catch (error) {
        console.log(error);
        return error
    }
}