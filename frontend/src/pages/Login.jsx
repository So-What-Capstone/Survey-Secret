import React from "react";
import "../styles/Login.css";

function Login() {
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
        <input type="button" value="Login" className="loginSubmit" />
      </div>
      <div className="loginOther">
        <input type="button" value="회원가입" />
        <input type="button" value="PW 찾기" />
      </div>
    </div>
  );
}

export default Login;
