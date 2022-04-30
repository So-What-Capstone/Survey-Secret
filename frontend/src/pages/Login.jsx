import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  let navigate = useNavigate();
  const register = () => {
    let path = `/register`;
    navigate(path);
  };
  const login = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <div className="login">
      <div>
        <h1>Survey Secret</h1>
      </div>
      <div>
        <input type="id" placeholder="ID" className="loginInputField" />
      </div>
      <div>
        <input
          type="password"
          name="pw"
          id="pw"
          placeholder="Password"
          className="loginInputField"
        />
      </div>
      <div className="loginSubmit">
        <input
          type="button"
          value="Login"
          className="loginSubmit"
          onClick={login} /*TODO: add login logic*/
        />
      </div>
      <div className="loginOther">
        <input type="button" value="회원가입" onClick={register} />
        <input type="button" value="PW 찾기" /*TODO: add callback to findPW*/ />
      </div>
    </div>
  );
}

export default Login;
