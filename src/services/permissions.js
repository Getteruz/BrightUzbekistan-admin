import { api } from "./api";

export const getPermissions = async() => {
    try {
        const res = await api.get('/permission')
        return res?.data
    } catch (error) {
        console.log(error);
    }
}