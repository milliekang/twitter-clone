import styled from "styled-components";

export const Switcher = styled.span`
margin-top: 20px;
a{
  color:teal
}
`

export const Wrapper = styled.div`
height:100%;
display: flex;
flex-direction: column;
align-items: center;
width: 420px;
padding:50px 0;
`;

export const Form = styled.form`
margin-top: 50px;
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
margin-bottom: 5px;
`;

export const Input = styled.input`
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

export const Title = styled.h1`
font-size: 52px;
`

export const Error = styled.p`
color:red;
`
