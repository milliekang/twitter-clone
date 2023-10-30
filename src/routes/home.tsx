import styled from "styled-components"
import PostTweetForm from "../components/post-tweet-form"
import Timeline from "../components/timeline";

const Wrapper = styled.div`
grid-template-rows:1fr 5fr;
`;

export default function Home(){
  // const logout = () => {
  //   auth.signOut()
  // }
  return (
  <Wrapper>
    <PostTweetForm />
    <Timeline />
  </Wrapper>
  )
}