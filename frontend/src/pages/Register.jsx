import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import FormError from "./../components/FormError";
import { createAccountMutation } from "../API";

const CREATE_ACCOUNT_MUTATION = createAccountMutation;

//로그인 한 사람만 올 수 있께 처리 필요...
function Register() {
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

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    //for testing
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (ok) {
      navigate("/login", { state: { message: "회원가입 완료^^" } });
    }
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { email, password, username } = getValues();
    createAccount({ variables: { email, password, username } });
  };

  const clearRegisterError = () => {
    clearErrors("result");
  };

  return (
    <div className="loginContainer">
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
            onFocus={clearRegisterError}
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
            onFocus={clearRegisterError}
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
            {...register("username", {
              required: "닉네임 필요",
              minLength: { value: 2, message: "2자 이상..." },
            })}
            onFocus={clearRegisterError}
            type="text"
            placeholder="Username"
            className="loginInputField"
            hasError={
              formState.errors?.username
                ? formState.errors?.username
                : undefined
            }
          ></input>
          <FormError message={formState.errors?.username?.message} />

          <input
            type="submit"
            value={loading ? "Loading" : "Register"}
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
            <Link to={"/login"}>이미 계정이 있으신가요?</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
