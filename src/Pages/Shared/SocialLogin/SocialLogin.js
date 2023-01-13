import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../hooks/useToken";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
      })
      .catch((err) => console.log(err));
  };

  const saveUser = (name, email) => {
    const user = { name, email, role: "buyer" };
    fetch("https://used-product-server-six.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginUserEmail(email);
      })
      .catch((err) => console.log("duplication not saved"));
  };

  return (
    <div className="pt-4 my-4">
      {/* <p className="text-center">Social Login</p> */}
      <p className="text-center">
        <button onClick={handleGoogleLogin} className="btn w-full">
          Google Login
        </button>
      </p>
    </div>
  );
};

export default SocialLogin;
