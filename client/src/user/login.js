import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, loadUser, login } from "../user/userActions";
import MetaData from "../components/MetaData";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { getExpenses } from "../Expenses/expensesActions";
import { getIncomes } from "../Income/incomeActions";
const Login = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, authenticated, error } = useSelector((state) => state.user);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn && authenticated) {
      dispatch(loadUser());
      dispatch(getExpenses());
      dispatch(getIncomes());
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, loading, alert, isLoggedIn, error, authenticated, history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg  text-light"
                style={{ backgroundColor: "#044A3A", borderRadius: "10%" }}
                onSubmit={submitHandler}
              >
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forget" className="float-left text-light">
                  Forgot Password?
                </Link>
                <br />
                <Link to="/register" className="float-left mt-3 text-light ">
                  New User?
                </Link>
                <br />
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-secondary rounded btn-block py-2 mt-0"
                  style={{
                    width: "-webkit-fill-available",
                    backgroundColor: "#FDB80D",
                    color: "044A3A",
                  }}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Login;
