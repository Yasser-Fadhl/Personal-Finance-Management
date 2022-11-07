import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link, Redirect, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../user/userActions";

const Header = () => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const { loading, authenticated, user, error } = useSelector(
    (state) => state.user
  );

  const logoutHandler = ({}) => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    Alert.success("You have logged out successfully");
    window.location.reload();
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark  p-3"
      style={{ backgroundColor: "#044A3A", borderRadius: 5 }}
    >
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand" href="#">
          <img
            src="./images/image001.png"
            alt="logo"
            className="img-fluid img-thumbnail px-2 "
            style={{
              width: "4rem",
              height: "3rem",
              marginLeft: "1.5rem",
              marginRight: "1rem",
              marginBottom: "0.5rem",
            }}
          />
          <h2 className="d-inline-flex mt-2" style={{ color: "#FAD107" }}>
            MaxNet Finance Manager
          </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto ">
            <li className=" novo nav-item">
              <Link
                to="/"
                className="  nav-link mx-2 active "
                style={{ color: "#FAD107" }}
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            {authenticated && !loading ? (
              <>
                <li className=" novo nav-item">
                  <Link
                    to="/logout"
                    className="novo nav-link mx-2"
                    style={{ color: "#FAD107" }}
                    onClick={logoutHandler}
                  >
                    logout
                  </Link>
                </li>
                <div className=" mt-2" style={{ marginLeft: "8rem" }}>
                  <figure className="avatar avatar-nav">
                    <img
                      src={
                        (user.image && user.image.url) ||
                        "/images/default_avatar.jpg"
                      }
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>
                  <span style={{ color: "#F8EF02" }}>{user && user.name}</span>
                </div>
              </>
            ) : (
              <li className=" novo nav-item">
                {" "}
                <Link
                  to="/login"
                  className=" nav-link mx-2"
                  style={{ color: "#FAD107" }}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

  {
    /* return (
    <>
      <ul
        className="nav container container-fluid "
        style={{ backgroundColor: "rgb(15, 68, 45)" }}
      >
        <li className="nav-item">
          <Link
            Link
            to="/"
            className="nav-link active"
            aria-current="page"
            href="#"
          >
            <img
              src="./images/image001.png"
              alt="logo"
              className="img-fluid img-thumbnail px-2 "
              style={{ width: "4rem", height: "4rem", marginLeft: "1.5rem" }}
            />
          </Link>
        </li>
        <li className=" col col-sm-6 nav-item">
          <Link to="/" className="nav-link my-4 text-center">
            <h1
              className="fs-4 fw-bolder text-white"
              style={{ fontFamily: "monospace" }}
            >
              Personal Finance Manager
            </h1>
          </Link>
        </li>
        <li className="nav-item">
          <div
            className="nav-link  my-4 text-center"
            style={{ marginLeft: "0.5rem" }}
          >
            {authenticated && !loading ? (
              <Link to="/logout">
                <button
                  className="btn"
                  style={{
                    backgroundColor: " rgb(243, 220, 45)",
                    float: "right",
                  }}
                  id="logout_btn"
                  onClick={logoutHandler}
                >
                  logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button
                  className="btn nav-link"
                  style={{
                    backgroundColor: " rgb(243, 220, 45)",
                    float: "right",
                  }}
                  id="login_btn"
                >
                  login
                </button>
              </Link>
            )}
          </div>
        </li>
      </ul>
    </>
  );*/
  }
};

export default withRouter(Header);
