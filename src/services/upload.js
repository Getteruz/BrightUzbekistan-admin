import axios from "axios"
import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";

const showAlert = useShowAlert(store.dispatch)

export const uploadImage = async (image) => {
    try {
        const fd = new FormData()
        fd.append('image', image)
        const res = await axios.post(`${import.meta.env.VITE_STORE_API}/upload/image`, fd, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        })
        return res?.data
    } catch (error) {
        showAlert({ message: error?.response?.data ? error?.response?.data?.message : error?.message })
    }
}

export const removeFile = async (url) => {
    try {
        console.log(url);
        await axios.delete(`${import.meta.env.VITE_STORE_API}/remove`, { data: { url } })
    } catch (error) {
        showAlert({ message: error?.response?.data ? error?.response?.data?.message : error?.message })
    }
}