import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-component";



const errorMessage = {
  "auth/email-already-in-use" : "This email is already in use",
  "auth/weak-password" : "Password is too weak"
}


export default function CreateAccount(){
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {target : {name, value}} = e;

    if(name === "name"){
      setName(value);
    }else if(name === "email"){
      setEmail(value);
    }else if(name === "password"){
      setPassword(value);
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(name, email, password);
    setError("")
    if(name == "" || password =="" || email == "") return;
    try{
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credential.user);
      await updateProfile(credential.user, {
        displayName: name,
      })
      navigate("/")
    }catch(e){
      console.log(e)
      if(e instanceof FirebaseError){
        setError(e.message)
      }
    }finally{setLoading(false)}
  }

  return <Wrapper>
    <Title>Create Account with Twitter</Title> 
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="name" placeholder="name" value={name} type="text" required />
      <Input onChange={onChange} name="email" placeholder="email" value={email} type="email" required/>
      <Input onChange={onChange} name="password" placeholder="password" value={password} type="password" required/>
      <Input onChange={onChange} type="submit" value={isLoading? "Loading" : "Create Account"} />
    </Form>
    {error !== "" ? <Error>{error}</Error>:''}
    <Switcher>Already have an account? <Link to="/login">login</Link></Switcher>
  </Wrapper>
}  