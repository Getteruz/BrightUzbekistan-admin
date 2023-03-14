import { api } from "./api";

export const getRoles = async() => {
    try {
        const res = await api.get('/position')
        return res?.data
    } catch (error) {
        console.log(error);
    }
}