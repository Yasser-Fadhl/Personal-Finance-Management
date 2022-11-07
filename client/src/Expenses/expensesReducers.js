import {
  ALL_EXPENSES_FAIL,
  ALL_EXPENSES_REQUEST,
  ALL_EXPENSES_SUCCESS,
  CLEAR_ERROR,
} from "../constants/constants";

export const expenseReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case ALL_EXPENSES_REQUEST:
      return {
        loading: true,
        expenses: [],
      };
    case ALL_EXPENSES_SUCCESS:
      return {
        loading: false,
        expenses: action.payload.expenses,
        expensesCount: action.payload.count,
        filteredExpensesCount: action.payload.filteredExpensesCount,
        Data: action.payload.amounts,
        lables: action.payload.lables,
        colors: action.payload.colors,
        totalDailyExp: action.payload.totalDailyExp,
      };
    case ALL_EXPENSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
