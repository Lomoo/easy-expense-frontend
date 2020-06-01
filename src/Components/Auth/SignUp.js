import React, { useReducer, useContext, useState } from "react";
import Authbuttons from "./Authbuttons";
import { UserContext } from "./UserState";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import AppNav from "../AppNav";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import * as yup from 'yup';

const SignUpFormCard = styled.div`
  padding-top: 10%;
`;
const SocialSignInText = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
`;
const InputForm = styled.form`
  margin-top: 10px;
`;

const initialFormState = {username: '', password: '', email: '', confirmationCode: ''}

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email()
      .required(),
  password: yup.string()
      .required()
      .min(8),
});

function reducer(state, action) {
  switch(action.type) {
    case 'updateFormState':
      return {
        ...state, [action.e.target.name]: action.e.target.value
      }
    default:
      return state
  }
}


async function cognitoSignUp({username,password,email}, updateFormType){
  try{
    await Auth.signUp({
      username,password,attributes:{email}
    })
    console.log("user signed up successfully");
    updateFormType('confirmSignUp')
  } catch(err){
    console.log("error signing up...", err)

  }
}

async function signIn( username, password ) {
  try {
    await Auth.signIn(username, password)
    console.log('sign in success!')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function confirmSignUp({username, password, confirmationCode}, updateFormType){
  try {
    const test = await Auth.confirmSignUp(username, confirmationCode);
    console.log('confirm sign up success!');
    signIn(username,password);
  } catch (err) {
    console.log('error signing up..', err)
  }
}

export default function SignUp() {

  const [formState, updateFormState] = useReducer(reducer, initialFormState)
  const [formType, updateFormType] = useState('signUp');
  const { user, userLoading } = useContext(UserContext);


  function renderForm() {
    switch(formType) {
      case 'signUp':
        return (
          <SignUpForm
          cognitoSignUp={() => cognitoSignUp(formState, updateFormType)}
          updateFormState={e => updateFormState({ type: 'updateFormState', e })}
        />
        )
      case 'confirmSignUp':
        return (
          
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      default:
        return null
    }
  }
  if (!user && !userLoading) {
    return (
      <div>
        <AppNav />
        {renderForm(formType)}
      </div>
    )
  }
  return <Redirect to='/'  />

}

function ConfirmSignUp(props){
  return(
        <SignUpFormCard
          id="signUpFormCard"
          className="columns is-mobile is-centered">
        <div className="card">
          <div className="card-content">
            <div className="column is-narrow">
              <SocialSignInText>
                Enter your Confirmation Code
              </SocialSignInText>
                <div className="field">
                <label className="label">Confirmation Code</label>
                  <div className="control">
                    <input className="input is-info"
                    name="confirmationCode"
                    type="text" 
                    placeholder="Confirmation Code"
                    onChange={e => {e.persist();props.updateFormState(e)}}/>
                  </div>
                </div>
                <button onClick={props.confirmSignUp}  className="button is-primary is-fullwidth"> Confirm </button>
            </div>
          </div>
        </div>
      </SignUpFormCard>
  )
}

function SignUpForm(props){
  const { register, handleSubmit, errors } = useForm({
    validationSchema: SignupSchema
  }); // initialise use-form hook
  

  const onSubmit = () => {
    props.cognitoSignUp();
  };

  return(
    <section className="section">
  <div
      id="signUpFormCard"
      className="columns is-mobile is-centered"
    >
    <div className="card">
      <div className="card-content">
        <div className="column is-narrow">
          <SocialSignInText>
            Sign in with your social accounts
          </SocialSignInText>
          <Authbuttons />
          <div className="divider">OR</div>
          <SocialSignInText>Sign up with a new account</SocialSignInText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
            <label className="label">Username</label>
              <div className="control">
                
                <input className={`input ${errors.username ? "is-danger" : "is-info"}`}
                ref={register}
                name="username"
                onChange={e => {e.persist();props.updateFormState(e)}}
                type="text" 
                placeholder="Username"/>
                {errors.username && <p className="help is-danger">{errors.username.message}</p>}
              </div>
            </div>
            <div className="field">
            <label className="label">Email</label>
              <div className="control">
                <input className={`input ${errors.email ? "is-danger" : "is-info"}`}
                ref={register}
                name="email"
                onChange={e => {e.persist();props.updateFormState(e)}}
                type="email" 
                placeholder="email@host.com"/>
                {errors.email && <p className="help is-danger">{errors.email.message}</p>}
              </div>
            </div>
            <div className="field">
            <label className="label">Password</label>
              <div className="control">
                <input className={`input ${errors.password ? "is-danger" : "is-info"}`}
                ref={register}
                name="password"
                type="password" 
                onChange={e => {e.persist();props.updateFormState(e)}}
                placeholder="password"/>
                {errors.password && <p className="help is-danger">{errors.password.message}</p>}
              </div>
            </div>
            <button type="submit" className="button is-primary is-fullwidth"> Sign Up </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </section>
  )
    
}


