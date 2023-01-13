import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import notFoundImg from "../../../assets/images/404-error-page-not-found.jpg";
import './DisplayError.css';

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("accessTokenUseProduct");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="error-page-center">
      <div className="h-full">
        <img className="h-80" src={notFoundImg} alt="not-found-icon" />
        <h4 className="text-3xl my-8">
          {error.statusText || error.message}! Something went wrong! Please{" "}
          <button className="btn btn-red-500" onClick={handleLogOut}>
            Sign out
          </button>
        </h4>
      </div>
    </div>
  );
};

export default DisplayError;
