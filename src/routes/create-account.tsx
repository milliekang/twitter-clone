import { useState } from "react";
import styled from "styled-components"


const Wrapper = styled.div``;

const Form = styled.form``;

const Input = styled.input``;


export default function CreateAccount(){

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return <Wrapper>
    <Form>
      <Input onChange={onChange} name="name" placeholder="name" value={name} type="text" required />
      <Input onChange={onChange} name="email" placeholder="email" value={email} type="email" required/>
      <Input onChange={onChange} name="password" placeholder="password" value={password} type="password" required/>
      <Input onChange={onChange} type="submit" value="create account" />
    </Form>
  </Wrapper>
}