import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import styled from "styled-components";
import { database } from "../routes/firebase";
import Tweet from "./tweet";

export interface ITweet{
  id:string,
  image?:string,
  tweet:string,
  userId:string,
  username:string,
  createdAt:number
}

const Wrapper = styled.div`
margin-top: 20px;
`;


export default function Timeline(){
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async() => {
    const tweetsQuery = query(collection(database, "tweets"), orderBy("createdAt"))
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const {tweet, createdAt, userId, username, image} = doc.data();
      return{
        tweet, createdAt, userId, username, image,id:doc.id
      }
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets()
  }, [])
  
  return <Wrapper>{tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}</Wrapper>
};