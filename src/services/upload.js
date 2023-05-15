import axios from "axios"
import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";

const showAlert = useShowAlert(store.dispatch)

export const uploadImage = async (image, folderName = '', resize = true) => {
    try {
        const fd = new FormData()
        fd.append('image', image)
        if(folderName) fd.append('folderName', folderName)
        const res = await axios.post(`${import.meta.env.VITE_STORE_API}/upload/image?${!resize ? 'resize=false' : ''}`, fd, {
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