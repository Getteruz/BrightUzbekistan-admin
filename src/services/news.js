import { api } from "./api";

export const createNews = async (data) => {
    try {
        const res = await api.post('/news', data)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}