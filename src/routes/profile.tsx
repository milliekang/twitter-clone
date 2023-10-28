import styled from "styled-components";
import { auth, database, storage } from "./firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

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

const AvatarImg = styled.img`
width:100%;
`;

const AvatarInput = styled.input`
display: none;
`

const Tweets = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 10px;
`;

const Name = styled.span``;

export default function Profile(){
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const onAvatarChange =  async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if(!user) return;
    if(files && files.length === 1){
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user.uid}`)
      const result = await uploadBytes(locationRef, file);

      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL:avatarUrl
      })
    }
  }

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(database, "tweets"),
      // make the condition => index 생성
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, image } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        image,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return <Wrapper>
    <AvatarUpload htmlFor="avatar">
      {Boolean(avatar) ? <AvatarImg src={avatar} /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

}
    </AvatarUpload>
    <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
    <Name>{user?.displayName ?? "Anonymous"}</Name>
    <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
  </Wrapper>
}