import { useState } from "react";
import styled from "styled-components"


const Wrapper = styled.div`
height:100%;
display: flex;
flex-direction: column;
align-items: center;
width: 420px;
padding:50px 0;
`;

const Form = styled.form`
margin-top: 50px;
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`;

const Input = styled.input`
padding: 10px 20px;
border-radius: 50px;
border: none;
width: 100%;
font-size:16px;
&[type="submit"]{
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
}
`;

const Title = styled.h1`
font-size: 52px;
`

const Error = styled.p`
color:red;
`

export default function CreateAccount(){

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

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(name, email, password);
    try{}catch(e){}finally{}
  }

  return <Wrapper>
    <Title>Login To Twitter</Title> 
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="name" placeholder="name" value={name} type="text" required />
      <Input onChange={onChange} name="email" placeholder="email" value={email} type="email" required/>
      <Input onChange={onChange} name="password" placeholder="password" value={password} type="password" required/>
      <Input onChange={onChange} type="submit" value={isLoading? "Loading" : "Create Account"} />
    </Form>
    {error !== "" ? <Error>{error}</Error>:''}
  </Wrapper>
}