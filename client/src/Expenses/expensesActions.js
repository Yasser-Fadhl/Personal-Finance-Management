import {
  ALL_EXPENSES_FAIL,
  ALL_EXPENSES_REQUEST,
  ALL_EXPENSES_SUCCESS,
  CLEAR_ERROR,
} from "../constants/constants";
import Axios from "axios";

export const getExpenses = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("token is not provided");
  try {
    dispatch({ type: ALL_EXPENSES_REQUEST });
    let url = `http://127.0.0.1:5000/api/v1/expenses`;

    const { data } = await Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": " http://localhost:3000",
        "x-access-token": `${token}`,
      },
    });

    dispatch({
      type: ALL_EXPENSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_EXPENSES_FAIL,
      payload: error.message,
    });
  }
};
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
