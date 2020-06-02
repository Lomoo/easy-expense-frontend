import React, { useReducer, useContext, useState } from "react";
import Authbuttons from "./Authbuttons";
import { UserContext } from "./UserState";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import AppNav from "../AppNav";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import * as yup from 'yup';
import { GlobalContext } from "../Context/GlobalState";

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


async function cognitoSignUp({username,password,email}, updateFormType, form){
  try{
    await Auth.signUp({
      username,password,attributes:{email}
    })
    console.log("user signed up successfully");
    updateFormType('confirmSignUp')
  } catch(err){
    if(err.name="UsernameExistsException"){
      return err.name;
    }else{
      console.log("error signing up...", err)
    }
  }
}

async function signIn( username, password ) {
  try {
    await Auth.signIn(username, password)
    console.log('sign in success!')
    AddNewUser();
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function confirmSignUp({username, password, confirmationCode}, updateFormType){

  try {
    await Auth.confirmSignUp(username, confirmationCode);
    console.log('confirm sign up success!');
    signIn(username,password);
    return(<Redirect to='/'  />)
  } catch (err) {
    console.log('error signing up..', err)
  }
}
async function AddNewUser(){
  try{
    const user = await Auth.currentAuthenticatedUser();
    addUser(user.attributes.sub);
  } catch(err){
    console.log("unable to add user : " ,err)
  }
}

async function addUser(userSub) {
  try {
    const res = await fetch(`/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userSub,
      }),
    });
    
  } catch (e) {
    console.log("unable to create user")
  }
};

export default function SignUp() {

  const [formState, updateFormState] = useReducer(reducer, initialFormState)
  const [formType, updateFormType] = useState('signUp');
  const { user, userLoading } = useContext(UserContext);
  const { addUser } = useContext(GlobalContext)
  const form = useForm({
    validationSchema: SignupSchema
  });
  const { register, handleSubmit, errors, setError } = form;




  function renderForm() {
    switch(formType) {
      case 'signUp':
        return (
          <SignUpForm
          form={form}
          cognitoSignUp={() => cognitoSignUp(formState, updateFormType)}
          updateFormState={e => updateFormState({ type: 'updateFormState', e })}
        />
        )
      case 'confirmSignUp':
        return (
          
          <ConfirmSignUp
            addUser = {addUser}
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


  const onSubmit = async () => {
    const res = await props.cognitoSignUp(props.form);
    if(res === "UsernameExistsException"){
      props.form.setError("username", "incorrect", "Username already exists");
    }
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
          <form onSubmit={props.form.handleSubmit(onSubmit)}>
            <div className="field">
            <label className="label">Username</label>
              <div className="control">
                
                <input className={`input ${props.form.errors.username ? "is-danger" : "is-info"}`}
                ref={props.form.register}
                name="username"
                onChange={e => {e.persist();props.updateFormState(e)}}
                type="text" 
                placeholder="Username"/>
                {props.form.errors.username && <p className="help is-danger">{props.form.errors.username.message}</p>}
              </div>
            </div>
            <div className="field">
            <label className="label">Email</label>
              <div className="control">
                <input className={`input ${props.form.errors.email ? "is-danger" : "is-info"}`}
                ref={props.form.register}
                name="email"
                onChange={e => {e.persist();props.updateFormState(e)}}
                type="email" 
                placeholder="email@host.com"/>
                {props.form.errors.email && <p className="help is-danger">{props.form.errors.email.message}</p>}
              </div>
            </div>
            <div className="field">
            <label className="label">Password</label>
              <div className="control">
                <input className={`input ${props.form.errors.password ? "is-danger" : "is-info"}`}
                ref={props.form.register}
                name="password"
                type="password" 
                onChange={e => {e.persist();props.updateFormState(e)}}
                placeholder="password"/>
                {props.form.errors.password && <p className="help is-danger">{props.form.errors.password.message}</p>}
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


