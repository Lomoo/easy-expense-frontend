import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Authbuttons from "./Authbuttons";
import { UserContext } from "./UserState";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import AppNav from "../AppNav";
import styled from "styled-components";
import * as yup from "yup";


const SocialSignInText = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
`;


const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  const [userState, updateUserState] = useState("");
  const [passwordState, updatePasswordState] = useState("");
  const { user, userLoading } = useContext(UserContext);

  const { register, handleSubmit, errors, setError } = useForm({
    validationSchema: SignupSchema,
  }); // initialise use-form hook

  async function signIn() {
    try {
      await Auth.signIn(userState, passwordState);
      console.log("sign in success!");
    } catch (err) {
      setError("username", "incorrect", "Incorrect username or password");
      setError("password", "notFound", "Incorrect username or password");
    }
  }

  const onSubmit = () => {
    signIn();
  };

  if (!user && !userLoading) {
    return (
      <div>
        <AppNav />
        <section className="section">
          <div id="signUpFormCard" className="columns is-mobile is-centered">
            <div className="card">
              <div className="card-content">
                <div className="column is-narrow">
                  <SocialSignInText>
                    {"Sign in with your social accounts"}
                  </SocialSignInText>
                  <Authbuttons />
                  <div className="divider">OR</div>
                  <SocialSignInText>
                    {"Sign In With Your Existing Account "}
                  </SocialSignInText>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className={`input ${
                            errors.username ? "is-danger" : "is-info"
                          }`}
                          ref={register}
                          name="username"
                          onChange={(e) => {
                            e.persist();
                            updateUserState(e.target.value);
                          }}
                          type="text"
                          placeholder="email"
                        />
                        {errors.username && (
                          <p className="help is-danger">
                            {errors.username.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className={`input ${
                            errors.password ? "is-danger" : "is-info"
                          }`}
                          ref={register}
                          name="password"
                          type="password"
                          onChange={(e) => {
                            e.persist();
                            updatePasswordState(e.target.value);
                          }}
                          placeholder="password"
                        />
                        {errors.password && (
                          <p className="help is-danger">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="button is-primary is-fullwidth"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return <Redirect to='/'  />
}
