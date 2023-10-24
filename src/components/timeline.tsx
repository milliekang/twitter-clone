import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import styled from "styled-components";
import { database } from "../routes/firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

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


  useEffect(() => {
    let unsubscribe : Unsubscribe | null = null;
    const fetchTweets = async() => {
      const tweetsQuery = query(collection(database, "tweets"), orderBy("createdAt", "desc"), limit(25))
      // onSnapshot => 필요한 데이터를 실시간으로 업데이트!
        unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {const {tweet, createdAt, userId, username, image} = doc.data();
        return{
          tweet, createdAt, userId, username, image,id:doc.id
        }
      });
      setTweets(tweets);
    })
    };

    fetchTweets();
    // call this func only the user watching this page
    return() => {
      unsubscribe && unsubscribe();
    }
  }, [])
  
  return <Wrapper>{tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}</Wrapper>
};