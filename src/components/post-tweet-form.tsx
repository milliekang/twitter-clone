import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, database, storage } from "../routes/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
`;

const TextArea = styled.textarea`
border: 2px solid white;
padding: 20px;
border-radius: 20px;
font-size: 16px;
color: white;
background-color: black;
width: 100%;
resize: none;
&::placeholder{
  font-size: 16px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
&:focus{
  outline: none;
  border-color: #37a0c6;
}
`;

const AttachFileButton = styled.label`
padding: 10px 0px;
color: #37a0c6;
text-align: center;
border-radius: 20px;
border: 1px solid #37a0c6;
font-size: 14px;
font-weight: 600;
cursor: pointer;
`;

const AttachFileInput = styled.input`
display: none;
`;

const SubmitButton = styled.input`
background-color: #37a0c6;
color: white;
border: none;
padding: 10px 0;
border-radius: 20px;
font-size: 16px;
cursor: pointer;
&:hover, &:active{
  opacity: 0.8;
}
`

export default function PostTweetForm(){
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);


  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }
  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e?.target;
    if(files && files.length === 1){
      setFile(files[0])
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || isLoading || tweet === "" || tweet.length > 140) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(database, "tweets"), {
        tweet,
        createdAt:Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid
      })
      if(file){
        if(file.size > 1024 * 1024){
          return alert("the file shold be smaller than 1MB");
        }
        // if(!file.type.match('image.*')){
        //   return alert("upload photo only");
        // }
        else{
          const locationRef = ref(storage, `tweets/${user.uid}_${user.displayName}/${doc.id}`);
          const result = await uploadBytes(locationRef, file);
          const imageUrl = await getDownloadURL(result.ref);
          await updateDoc(doc, {
            image: imageUrl,
          })
        }
      }
      setTweet("");
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  return <Form onSubmit={onSubmit}>
    <TextArea required rows={5} maxLength={140} value={tweet} onChange={onChange} placeholder="what is happening"/>
    <AttachFileButton htmlFor="file">{file ? "Photo Added ✅" : "Add Photo"}</AttachFileButton>
    <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
    <SubmitButton type="submit" value={isLoading ? "Posting" : "Post Tweet"}/>
  </Form>
}