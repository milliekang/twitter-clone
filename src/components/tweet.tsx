import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, database, storage } from "../routes/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const Wrapper = styled.div`
display: grid;
grid-template-columns: 3fr 1fr;
padding: 20px;
border: 1px solid rgba(255, 255,255, 0.5);
border-radius: 10px;
margin-top: 10px;
`;
const Column = styled.div`
`;
const Photo = styled.img`
width: 100px;
height: 100px;
border-radius: 15px;
display: flex;
margin: auto;
`;

const Username = styled.span`
font-weight: 600;
font-size: 15px;
`;
const Payload = styled.p`
margin: 10px 0;
font-size: 18px;
`;

const DeleteButton = styled.button`
background-color: tomato;
color: white;
font-weight: 600;
font-size: 12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
box-shadow: none;
border: none;
`;

const EditButton = styled.button`
margin: 0 5px;
background-color: blueviolet;
color: white;
font-weight: 600;
font-size: 12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
box-shadow: none;
border: none;
`;

const ConfirmButton = styled.button`
background-color: green;
color: white;
font-weight: 600;
font-size: 12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
box-shadow: none;
border: none;
`;

const PhotoEditButton = styled.label`
color: #37a0c6;
color: white;
font-weight: 600;
font-size: 12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
box-shadow: none;
border: none;
cursor: pointer;
`;

const PhotoEdit = styled.input`
display: none;
`;

const Form = styled.form``;


const EditText = styled.textarea``;

export default function Tweet({username, image, tweet, userId, id}:ITweet){
  const [editing, isEditing] = useState(false);
  const [text, setText] = useState(tweet);
  const [file, setFile] = useState<File | null>(null);
  const user = auth.currentUser;
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }
  const onEdit = async() => {
    try {
      isEditing(true);
    } catch (error) {
      console.log(error);
    }
  }

  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e?.target;
    if(files && files.length === 1){
      setFile(files[0])
    }
  }

  const onConfirm = async() => {
    try {
      updateDoc(doc(database, "tweets", id), {
        tweet: text,
      });
      if(file){
        if(file.size > 1024 * 1024){
          return alert("the file shold be smaller than 1MB");
        }
        // if(!file.type.match('image.*')){
        //   return alert("upload photo only");
        // }
        else{
          if(file !== null){
            if(image){
              const photoRef = ref(storage, `tweets/${userId}/${id}`);
              await deleteObject(photoRef);
            }
            const locationRef = ref(storage, `tweets/${userId}/${id}`);
            const result = await uploadBytes(locationRef, file);
            const imgUrl = await getDownloadURL(result.ref);
            await updateDoc(doc(database, "tweets", id), {
              image: imgUrl,
            })
          }
        }
      }
      isEditing(false)
    } catch (error) {
      
    }
  }
  const onDelete = async() => {
    const ok = confirm("Are you sure to delete this tweet?");
    if(!ok) return;
    if(user?.uid !== userId) return;
    try {
      await deleteDoc(doc(database, "tweets", id))
      if(image){
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`)
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error)
    }
    finally{

    }
  }
  return (
    <Wrapper>
    <Column>
      {!editing && <Username>{username}</Username>}
      {editing ? <Form><EditText onChange={onChange} value={text}></EditText></Form> : <Payload>{tweet}</Payload>}
      {user?.uid === userId ? <DeleteButton onClick={onDelete}>delete</DeleteButton> : null}
      {user?.uid === userId && !editing ? <EditButton onClick={onEdit}>edit</EditButton> : null}
      {editing && <ConfirmButton onClick={onConfirm}>confirm</ConfirmButton> }
      {editing &&  <>
        <PhotoEditButton htmlFor="editPhoto">{file ? "changed" : "new photo"}</PhotoEditButton>
        <PhotoEdit onChange={onFileChange} type="file" id="editPhoto" accept="image/*" />
      </> }
    </Column>
    {image ? (
      <Column>
        <Photo src={image} />
      </Column>
    ) : null}
  </Wrapper>
  )
}