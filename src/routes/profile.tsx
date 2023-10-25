import styled from "styled-components";
import { auth } from "./firebase";
import { useState } from "react";

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
gap: 20px;
`;

const AvatarUpload = styled.label`
display: flex;
width: 80px;
overflow: hidden;
height: 80px;
border-radius: 50%;
background-color: #1d9bf0;
cursor: pointer;
justify-content: center;
align-items: center;

svg{
  width: 50px;
}

`;

const AvatarImg = styled.img``;

const AvatarInput = styled.input`
display: none;
`

const Name = styled.span``;

export default function Profile(){

  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  return <Wrapper>
    <AvatarUpload htmlFor="avatar">
      {Boolean(avatar) ? <AvatarImg src={avatar} /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
}
    </AvatarUpload>
    <AvatarInput id="avatar" type="file" accept="image/*" />
    <Name>{user?.displayName ?? "Anonymous"}</Name>
  </Wrapper>
}