import { useDispatch } from "react-redux";
import { alertActions } from "./alert.slice";

let _id = 1

export const useShowAlert = (dispatch) => {
  // const dispatch = useDispatch()
  let id = _id
  return ({ message = "", type = "error" }) => {
    dispatch(alertActions.addAlert({ message, type, id }))
    setTimeout(() => {
      dispatch(alertActions.deleteAlert(id))
    }, 4000);
    _id++
  }
}