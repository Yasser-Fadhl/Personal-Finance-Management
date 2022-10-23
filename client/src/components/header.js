import React from "react";

const Header = () => {
  return (
    <>
      <nav className="navbar row bg-dark p-3">
        <div className="col-12 col-sm-3">
          <div className="navbar-brand">
            <img
              src="./images/image001.png"
              alt="logo"
              className="img-fluid img-thumbnail "
              style={{ width: "4rem", height: "4rem", marginLeft: "2rem" }}
            />
          </div>
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <h1 className="fs-4 fw-bolder .text-white" style={{ color: "white" }}>
            Personal Finance Manager
          </h1>
        </div>

        <div className="col-12 col-sm-3 mt-4 mt-md-0 text-center">
          <button className="btn btn-primary" id="login_btn">
            Login
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
