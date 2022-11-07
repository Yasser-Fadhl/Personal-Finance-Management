import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./user/userReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { expenseReducer } from "./Expenses/expensesReducers";
import { incomeReducer } from "./Income/incomeReducer";
const reducer = combineReducers({
  user: userReducer,
  expenses: expenseReducer,
  income: incomeReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
