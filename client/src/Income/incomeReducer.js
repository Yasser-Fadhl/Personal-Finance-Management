import {
  ALL_INCOME_FAIL,
  ALL_INCOME_REQUEST,
  ALL_INCOME_SUCCESS,
  CLEAR_ERROR,
} from "../constants/constants";

export const incomeReducer = (state = { income: [] }, action) => {
  switch (action.type) {
    case ALL_INCOME_REQUEST:
      return {
        loading: true,
        income: [],
      };
    case ALL_INCOME_SUCCESS:
      return {
        loading: false,
        income: action.payload.income,
        incomeCount: action.payload.count,
        filteredIncomeCount: action.payload.filteredIncomeCount,
      };
    case ALL_INCOME_FAIL:
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
