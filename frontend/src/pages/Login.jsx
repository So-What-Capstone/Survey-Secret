import { gql, useLazyQuery, useMutation } from "@apollo/client";
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
import { loginMutation } from "../API";
import { getUserQuery } from "../API/meQuery";

const LOGIN_MUTATION = loginMutation;

//로그인 한 사람만 올 수 있께 처리 필요...
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
  const [getUser] = useLazyQuery(getUserQuery);

  useEffect(() => {
    setBackIndex(Math.floor(Math.random() * 4));
  }, []);

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    try {
      logUserIn(token);
      const user = await getUser();
      logUserIn(token, user.data.me.user.username);
      navigate("/");
    } catch (err) {
      return setError("result", {
        message: err.message,
      });
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
                value: 5,
                message: "이메일은 5자 이상입니다.",
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
              minLength: { value: 2, message: "비밀번호는 2자 이상입니다." },
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
            value={loading ? "로딩 중" : "로그인"}
            disabled={!formState.isValid || loading}
            className={
              !formState.isValid || loading
                ? "loginSubmit disabled"
                : "loginSubmit"
            }
          ></input>
          <FormError message={formState.errors?.result?.message} />
        </form>

        <div className="bottomBox">
          <span className="loginOther">
            <Link to={"/register"}>회원가입</Link>
            <Link to="/findpw">계정 찾기</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
