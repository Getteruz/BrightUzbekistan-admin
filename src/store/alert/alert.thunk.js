import { useDispatch } from "react-redux";
import { alertActions } from "./alert.slice";

let _id = 1

export const useShowAlert = (dispatch) => {
  // const dispatch = useDispatch()
  let id = _id
  return ({ message = "", type = "error", position = 'top-center', duration = 4000 }) => {
    dispatch(alertActions.addAlert({ message, type, id, position }))
    setTimeout(() => {
      dispatch(alertActions.deleteAlert(id))
    }, duration);
    _id++
  }
}