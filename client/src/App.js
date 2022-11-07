import Header from "./components/header";
import Footer from "./components/footer";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./user/userActions";
import { getExpenses } from "./Expenses/expensesActions";
import Login from "./user/login";
import Register from "./user/register";
import Dashboard from "./components/Dashboard";

import Home from "./components/home";
import { getIncomes } from "./Income/incomeActions";
function App() {
  const { loading, authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getExpenses());
    dispatch(getIncomes());
  }, [dispatch]);

  return (
    <Router>
      <>
        <div className="App">
          <Header />

          <Switch>
            <>
              <div
                className="container container-fluid "
                style={{
                  paddingLeft: "0%",
                  paddingRight: "0%",
                }}
              >
                <Route
                  path="/"
                  exact
                  component={!loading && authenticated ? Dashboard : Home}
                />

                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </div>
            </>
          </Switch>

          <Footer />
        </div>
      </>
    </Router>
  );
}

export default App;
