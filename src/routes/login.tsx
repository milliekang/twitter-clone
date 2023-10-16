import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Switcher, Title, Wrapper, Form } from "../components/auth-component";


export default function CreateAccount(){
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {target : {name, value}} = e;

    if(name === "email"){
      setEmail(value);
    }else if(name === "password"){
      setPassword(value);
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(name, email, password);
    setError("")
    if(password =="" || email == "") return;
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    }catch(e){
      if(e instanceof FirebaseError){
        setError(e.message)
      }
    }finally{setLoading(false)}
  }

  return <Wrapper>
    <Title>Login To Twitter</Title> 
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" placeholder="email" value={email} type="email" required/>
      <Input onChange={onChange} name="password" placeholder="password" value={password} type="password" required/>
      <Input onChange={onChange} type="submit" value={isLoading? "Loading" : "Login"} />
    </Form>
    {error !== "" ? <Error>{error}</Error>:''}
    <Switcher>Don't have an account? <Link to="/account">create account</Link></Switcher>
  </Wrapper>
}  