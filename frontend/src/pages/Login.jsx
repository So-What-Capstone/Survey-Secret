import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { logUserIn } from "../apollo";
import FormError from "./../components/FormError";
import back1 from "../resources/login-background-1.jpeg";
import back2 from "../resources/login-background-2.jpeg";
import back3 from "../resources/login-background-3.jpeg";
import back4 from "../resources/login-background-4.jpeg";
import { useEffect } from "react";
import { useState } from "react";
const BACK_CANDS = [back1, back2, back3, back4];

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

//로그인 한 사람만 올 수 있께 처리 필요...
//isLoggedInVar 사용
function Login() {
  const [backIndex, setBackIndex] = useState(0);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setBackIndex(Math.floor(Math.random() * 4));
  }, []);

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    //for testing
    console.log(ok, error, token);
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);

      navigate("/", { state: { message: "XX님 hi" } });
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    login({ variables: { email, password } });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <div
      className="loginContainer"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BACK_CANDS[backIndex]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="login">
        <div>
          <h1>Survey Secret</h1>
        </div>
        <form className="loginForm" onSubmit={handleSubmit(onSubmitValid)}>
          <input
            {...register("email", {
              required: "이메일 필요",
              minLength: {
                value: 10,
                message: "(testing)이메일은 10자 이상...........",
              },
              // validation
              // validate:{value:(currentValue)=>}
            })}
            onFocus={clearLoginError}
            type="email"
            placeholder="Email"
            hasError={
              formState.errors?.email ? formState.errors?.email : undefined
            }
            className="loginInputField"
          ></input>

          <FormError message={formState.errors?.email?.message} />
          <input
            {...register("password", {
              required: "패스워드 필요",
              minLength: { value: 2, message: "2자 이상..." },
            })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            className="loginInputField"
            hasError={
              formState.errors?.password
                ? formState.errors?.password
                : undefined
            }
          ></input>
          <FormError message={formState.errors?.password?.message} />

          <input
            type="submit"
            value={loading ? "Loading" : "LogIn"}
            disabled={!formState.isValid || loading}
            className={
              !formState.isValid || loading
                ? "loginSubmit-disabled"
                : "loginSubmit"
            }
          ></input>
          <FormError message={formState.errors?.result?.message} />
        </form>

        <div className="bottomBox">
          <span className="loginOther">
            <Link to={"/register"}>Register</Link>
          </span>
          <span className="loginOther">
            <Link to="/findpw">Find Account</Link>
          </span>
        </div>

        {/*       
      <div className="loginOther">
        <input type="button" value="회원가입" onClick={register} />
        <input type="button" value="PW 찾기" onClick={findpw} />
      </div> */}
      </div>
    </div>
  );
}

export default Login;
